const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
  }

  // first stage
  async prompting() {
    this.log('Busilop Generator starting... 🤖');

    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'What kind of CRUD app do you want to create today?',
        choices: ['Survey', 'Registration'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Input the name for this app',
        validate: input => Boolean(input.length),
      },
    ]);
  }

  // second stage
  writing() {
    // this.log('Writing files... 📝');

    const { type, name } = this.answers;
    if (type === 'Survey') {
      this.fs.copyTpl(
        this.templatePath('component.html'),
        this.destinationPath(`components/${name}.html`),
        {
          name,
        },
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath(`components/${name}-index.html`),
        {
          name,
        },
      );
    }
  }

  // last stage
  end() {
    this.log('Scaffolding created successfully... 👋');
  }
};
