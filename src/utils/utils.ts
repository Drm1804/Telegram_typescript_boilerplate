export  async function pause(val = 100): Promise<null> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, val)
  })
}


