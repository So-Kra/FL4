const footerTemplate = document.createElement('template');

footerTemplate.innerHTML = `
  <footer>
    <slot name="styles"></slot>
    <div class="panel-end">
    <a href="https://so-kra.github.io/FoodLanders/"><img src="{{smallRoundImagePath}}" alt="" class="small-round-image"></a> 
    <div class="text-item">
    <div class="social-media">
        Follow us on
        <a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="https://www.tiktok.com/" target="_blank"><i class="fab fa-tiktok"></i></a>
        <a href="mailto:foodlanders_ath@gmail.com" target="_blank"> <i class="fa fa-envelope"></i></a>
    </div>  
    <div class="footer"> &copy; 2021 Foodlanders. All Rights Reserved.
    </div>
    </div> 
    </div>
  </footer>
`;

class Footer extends HTMLElement {
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
    
    // DO NOT ACTIVATE UNLSS WE GET MORE PITCURES, CODE BREAKS   
    //if (paths.length !== 3) {
    //  console.error('Invalid number of image paths provided.');
    //  return;
    //}

    // Replace the image paths in the template with the actual image paths
    const templateHTML = footerTemplate.innerHTML
      .replace('{{smallRoundImagePath}}', paths[0]) // Replace the second image path


    const template = document.createElement('template');
    template.innerHTML = templateHTML;

    shadowRoot.appendChild(template.content.cloneNode(true)); // Append the modified template to the shadow DOM
  }
}


customElements.define('footer-component', Footer);
