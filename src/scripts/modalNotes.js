displaySlideNotes = async () => {
    const deck = document.getElementById('slider');

    if (!deck) {
        return;
    }

    const index = await deck.getActiveIndex();

    const slide = document.querySelector('.deckgo-slide-container:nth-child(' + (index + 1) + ')');

    if (!slide) {
        return;
    }

    const title = slide.querySelector('[slot="title"]');
    const notes = slide.querySelector('[slot="notes"][show]');

    const titleText = title ? title.innerHTML : 'Slide ' + index;
    const notesText = notes ? notes.innerHTML : 'No particular notes';

    // create component to open
    const element = document.createElement('div');
    element.innerHTML = `
  <ion-header>
    <ion-toolbar color="tertiary">
      <ion-buttons slot="start">
          <ion-button>
              <ion-icon src="https://deckdeckgo.com/assets/icons/ionicons/close.svg" aria-label="Close"></ion-icon>
          </ion-button>
      </ion-buttons>
      <ion-title>${titleText}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding" color="primary">
    <p style="white-space: pre-wrap;">${notesText}</p>
  </ion-content>
  `;

    const modal = document.createElement('ion-modal');
    modal.component = element;

    document.body.appendChild(modal);

    // present the modal
    await modal.present();

    // listen for close event
    const buttonDismiss = document.querySelector('ion-modal ion-button');
    buttonDismiss.addEventListener('click', async () => {
        await document.querySelector('ion-modal').dismiss();
    });
};
