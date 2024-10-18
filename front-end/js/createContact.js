// Создание разментки добавления новго контакта
import { svgDelete } from './svg.js';
import { telMask } from './telMask.js';

export const createContactItem = () => {
  const contact = document.createElement('div');
  const contactType = document.createElement('div');
  const contactName = document.createElement('button');
  const contactList = document.createElement('ul');
  const contactPhone = document.createElement('li');
  const contactVk = document.createElement('li');
  const contactFb = document.createElement('li');
  const contactEmail = document.createElement('li');
  const contactOther = document.createElement('li');
  const contactInput = document.createElement('input');
  const contactPhoneInput = document.createElement('input');
  const contactDelete = document.createElement('button');
  const contactDeleteTooltip = document.createElement('span');

  contact.classList.add('contact');
  contactDeleteTooltip.classList.add('contact-tooltip', 'site-tooltip');
  contactType.classList.add('contact__type');
  contactName.classList.add('contact__name');
  contactList.classList.add('contact__list', 'list-reset');
  contactPhone.classList.add('contact__item');
  contactVk.classList.add('contact__item');
  contactFb.classList.add('contact__item');
  contactEmail.classList.add('contact__item');
  contactOther.classList.add('contact__item');
  contactInput.classList.add('contact__input');
  contactDelete.classList.add('contact__delete');
  contactPhoneInput.classList.add('contact__input');

  contactName.textContent = 'Телефон';
  contactDeleteTooltip.textContent = 'Удалить контакт';
  contactPhone.textContent = 'Телефон';
  contactVk.textContent = 'VK';
  contactEmail.textContent = 'Email';
  contactFb.textContent = 'Facebook';
  contactOther.textContent = 'Другое';
  contactInput.placeholder = 'Введите данные контакта';
  contactInput.type = 'text';
  contactDelete.innerHTML = svgDelete;
  contactInput.id = contactName.textContent;
  contactPhoneInput.placeholder = 'Введите телефон';

  // Удаление поля добавления нового контакта
  contactDelete.addEventListener('click', e => {
    e.preventDefault();
    contact.remove();
    // Делаем кнопку "доавить контакт" активной при удалении поля нового контакта
    document
      .querySelector('.modal__btn-contact')
      .classList.add('modal__btn-contact--active');
  });

  // Открытие/закрытие меню выбора вида контакта
  contactName.addEventListener('click', e => {
    e.preventDefault();
    contactList.classList.toggle('contact__list--active');
    contactName.classList.toggle('contact__list--active');
  });

  // Если курсор на меню, тогда оно открыто, если убрали курсор, меню закрылось
  contactType.addEventListener('mouseleave', () => {
    contactList.classList.remove('contact__list--active');
    contactName.classList.remove('contact__list--active');
  });

  const typesArray = [
    contactEmail,
    contactFb,
    contactVk,
    contactPhone,
    contactOther,
  ];

  telMask(contactPhoneInput);

  for (const type of typesArray) {
    type.addEventListener('click', () => {
      contactInput.value = '';
      contactPhoneInput.value = '';
      contactName.textContent = type.textContent;

      if (contactName.textContent === 'Телефон') {
        contact.innerHTML = '';
        contact.append(contactType, contactPhoneInput, contactDelete);
        telMask(contactPhoneInput);
      } else {
        contact.innerHTML = '';
        contact.append(contactType, contactInput, contactDelete);
      }

      contactList.classList.remove('contact__list--active');
      contactName.classList.remove('contact__list--active');
    });
  }

  contactDelete.append(contactDeleteTooltip);
  contact.append(contactType, contactPhoneInput, contactDelete);
  contactType.append(contactName, contactList);
  contactList.append(
    contactPhone,
    contactEmail,
    contactVk,
    contactFb,
    contactOther
  );

  return {
    contact,
    contactName,
    contactInput,
    contactPhoneInput,
    contactDelete,
  };
};
