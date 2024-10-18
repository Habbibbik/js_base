export const hideContacts = () => {
  const contactsCells = document.querySelectorAll('.clients__contacts');
  if (contactsCells.length) {
    contactsCells.forEach(cell => {
      const contactLinks = cell.querySelectorAll('.contacts__link');
      if (contactLinks.length) {
        if (contactLinks.length > 4) {
          cell.classList.add('more-contacts');

          const more = document.createElement('button');
          more.classList.add('btn-reset', 'more__button');

          more.textContent = `+${contactLinks.length - 4}`;

          if (!cell.querySelector('button')) {
            cell.append(more);
          }

          more.addEventListener('click', () => {
            cell.classList.add('show');
            more.classList.add('hidden');
          });
        }
      }
    });
  }
};
