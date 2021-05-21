class FormataDataService {
  constructor(data) {
    this.data = data;
  };

  call() {
    return new String(this.data).split('-').reverse().join('/');
  };
};

module.exports = FormataDataService;
