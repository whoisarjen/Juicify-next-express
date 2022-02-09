self.onmessage = (message) => {
    const object = message.data
    console.log('Socket Worker is starting the job with this object', object)
};

export { }