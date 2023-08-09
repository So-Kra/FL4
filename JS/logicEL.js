console.log("JavaScript code starts executing...");

// Define a custom include HTML directive
document.querySelectorAll('include').forEach(async (element) => {
  // Get the 'src' attribute value from the 'include' element
  const src = element.getAttribute('src');

  // Fetch the content of the specified file (e.g., header.html or footer.html)
  const response = await fetch(src);

  // Extract the text content from the response
  const content = await response.text();

  // Insert the fetched content after the 'include' element's position in the DOM
  element.insertAdjacentHTML('afterend', content);

  // Remove the 'include' element from the DOM, leaving only the fetched content
  element.remove();
});

console.log("HTML inclusions done...");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const dataset = [
  { item: 'Vegan Bolognese', link: 'https://www.google.com/' },
  { item: 'Vegan Meatballs', link: 'https://www.google.com/' },
  { item: 'Vegan burgers', link: 'https://www.google.com/' },
  { item: 'Balls', link: 'https://www.google.com/' },
  { item: 'Mango balls', link: 'https://www.google.com/' }
];

// Function to check if input is contained within the dataset
function search() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.toLowerCase();
  const suggestionList = document.getElementById('suggestionList');

  // Clear previous suggestions
  suggestionList.innerHTML = '';

  if (query.length >= 2) {
    const filteredResults = dataset.filter(item => item.item.toLowerCase().includes(query));
    console.log(filteredResults);
    // Do something with the filtered results, e.g., display them on the page as suggestions
    filteredResults.forEach(result => {
      const suggestionItem = document.createElement('li');
      suggestionItem.textContent = result.item;
      suggestionItem.addEventListener('click', () => redirectToLink(result.link));
      suggestionList.appendChild(suggestionItem);
    });
  }
}

// Function to redirect to a link
function redirectToLink(link) {
  window.location.href = link;
}

// Check if the searchInput element exists before adding the event listener
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  // Event listener for input change
  searchInput.addEventListener('input', search);
  console.log("Search up and running...");
} else {
  console.log("SearchInput element is missing, search functionality skipped.");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to show the pop-up message
function showPopupMessage() {
  popupMessage.style.display = "block";
  modalBack.style.display = "block";
}

// Function to hide the pop-up message
function hidePopupMessage() {
  popupMessage.style.display = "none";
  modalBack.style.display = "none";
}

// Fetch and insert the trigger area
fetch('../el/header.html')
  .then(response => response.text())
  .then(data => {
    const triggerAreaContainer = document.createElement('div');
    triggerAreaContainer.innerHTML = data.trim();
    document.body.prepend(triggerAreaContainer);
    // Get references to the trigger area and the pop-up message
    var triggerButton = document.getElementById("triggerArea");
    var popupMessage = document.getElementById("popupMessage");
    var modalBack = document.getElementById("modalBack");

    if (triggerButton && popupMessage) {
      // Attach event listener for click on the trigger area to show the pop-up message
      triggerButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent click event from bubbling up to the document
        showPopupMessage();
      });

      // Attach event listener for click outside the pop-up to hide it
      document.addEventListener("click", function () {
        hidePopupMessage();
      });

      // Attach event listener to the pop-up message to prevent hiding when clicking inside the message
      popupMessage.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent click event from bubbling up to the document
      });
    } else {
      console.log("Trigger area or popup message element is missing, pop-up functionality skipped.");
    }
  })
  .catch(error => console.error(error));

console.log("Header fetched...");

// Fetch and insert the footer area
fetch('../el/footer.html')
  .then(response => response.text())
  .then(data => {
    const footerContainer = document.createElement('div');
    footerContainer.innerHTML = data.trim();
    document.body.appendChild(footerContainer);
  })
  .catch(error => console.error(error));

console.log("Footer fetched...");
