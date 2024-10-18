export const telMask = input => {
  let element = input;
  let maskOptions = {
    mask: '+{7}(000)000-00-00',
  };
  let mask = IMask(element, maskOptions);
};


