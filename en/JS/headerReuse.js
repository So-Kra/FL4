const headerTemplate = document.createElement('template');

headerTemplate.innerHTML = `
  <header>
  <slot name="styles"></slot>
  <div class="filler">
      <div class="text-item">
          Curated content at your inbox every week, <a href="newsletter.html" class="newsletter-link">sign up <img src="{{heartImagePath}}" alt="heart" class="heart"></a></p>
      </div> 
      <div class="social-media">
             <a href="https://www.instagram.com/foodlanders_ath/" target="_blank"><i class="fab fa-instagram"></i></a>
             <a href="https://www.tiktok.com/@foodlanders_ath?_t=8XyqegFY4cY&_r=1" target="_blank"><i class="fab fa-tiktok"></i></a>
             <a href="contactForm.html"> <i class="fa fa-envelope"></i></a>
      </div>  
  </div>
  <div class="panel">
      <div class="listing-horizontal">
          <ul>
              <li><a href="https://www.flickr.com/photos/lego7/35678065560">Trips</a></li>
              <li><a href="content/dining.html">Dining</a></li>
              <li><a href="https://www.flickr.com/photos/lego7/35678065560">Recipes</a></li>
          </ul>
      </div>
      <a href="https://so-kra.github.io/FoodLanders/"><img src="{{smallRoundImagePath}}" alt="" class="small-round-image"></a>
      <div class="listing-horizontal">
          <ul>
              <li><a href="https://so-kra.github.io/FoodLanders/">Home</a></li>
              <li><a href="index.html">About</a></li>
              <li><a href="https://www.flickr.com/photos/lego7/35678065560"></a><img src="{{searchImagePath}}" alt="search" class="lens"></li>
          </ul>
      </div>
  </div>

  </header> 
`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const imagePaths = this.getAttribute('image-paths'); // Retrieve the image path attribute
    const styles = this.getAttribute('styles');
    const fontAwesome = document.querySelector('link[href*="font-awesome"]');
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    if (fontAwesome) {
      shadowRoot.appendChild(fontAwesome.cloneNode()); // Clone and append the Font Awesome stylesheet
    }

    if (styles) {
      const stylePaths = styles.split(',');
      stylePaths.forEach(path => {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = path.trim();
        shadowRoot.appendChild(styleLink);
      });
    }

    const paths = imagePaths.split(',').map(path => path.trim()); // Split the image paths once and store the array
    /*
    if (paths.length !== 3) {
      console.error('Invalid number of image paths provided.');
      return;
    }
    */
    // Replace the image paths in the template with the actual image paths
    const templateHTML = headerTemplate.innerHTML
      .replace('{{heartImagePath}}', paths[0]) // Replace the first image path
      .replace('{{smallRoundImagePath}}', paths[1]) // Replace the second image path
      .replace('{{searchImagePath}}', paths[2]); // Replace the third image path

    const template = document.createElement('template');
    template.innerHTML = templateHTML;

    shadowRoot.appendChild(template.content.cloneNode(true)); // Append the modified template to the shadow DOM
  }
}

customElements.define('header-component', Header);





