// Создание модального окна
import { sendClientData } from './clientsApi.js';
import { createClientsForm } from './createModalForm.js';
import { validateClientContact } from './validateContact.js';
import { validateClientForm } from './validateForm.js';
import { createClientItem } from './createClientItem.js';

export const addClientModal = () => {
  const createForm = createClientsForm();
  const modal = document.createElement('div');
  const modalContent = document.createElement('div');

  modal.classList.add('modal', 'site-modal', 'modal-active');
  modalContent.classList.add(
    'modal__content',
    'site-modal__content',
    'modal-active'
  );
  createForm.form.classList.add('add-client');

  modal.append(modalContent);
  modalContent.append(
    createForm.modalClose,
    createForm.modalTitle,
    createForm.form
  );

  // Создание объекта клиента и отправка на сервер
  createForm.form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validateClientForm()) {
      return;
    }

    const contactTypes = document.querySelectorAll('.contact__name');
    const contactValues = document.querySelectorAll('.contact__input');

    let contacts = [];
    let clientObj = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value,
      });
    }

    clientObj.name = createForm.inputName.value;
    clientObj.surname = createForm.inputSurname.value;
    clientObj.lastName = createForm.inputLastName.value;
    clientObj.contacts = contacts;

    const spinner = document.querySelector('.modal__spinner');

    try {
      spinner.style.display = 'block';
      const data = await sendClientData(clientObj, 'POST');
      setTimeout(() => {
        // отрисовка клиента в таблице
        document
          .querySelector('.clients__tbody')
          .append(createClientItem(data));
        // Закрытие модалки после добавления клиента в таблицу
        document.querySelector('.modal').remove();
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => (spinner.style.display = 'block'), 1500);
    }
  });

  // Закрытие модального окна
  createForm.modalClose.addEventListener('click', () => {
    modal.remove();
  });

  createForm.cancelBtn.addEventListener('click', () => {
    modal.remove();
  });

  // Закрытие модально окна вне модального окна
  document.addEventListener('click', e => {
    if (e.target == modal) {
      modal.remove();
    }
  });

  return modal;
};
