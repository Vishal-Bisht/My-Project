const generateId = () => {
  const albs = 'abcdefghijklmnopqrstuvwxyz0123456789';

  const generateSegment = (length) => {
    let segment = '';
    for (let i = 0; i < length; ++i) {
      const index = randomIndex(albs.length);
      segment += albs[index];
    }
    return segment;
  };

  const segment1 = generateSegment(6);
  const segment2 = generateSegment(7);
  const segment3 = generateSegment(6);

  const id = `${segment1}-${segment2}-${segment3}`;
  return id;
};

const randomIndex = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber);
};