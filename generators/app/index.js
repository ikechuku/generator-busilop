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
        message: 'Input the name for this module',
        validate: input => Boolean(input.length),
      },
    ]);
  }

  // second stage
  writing() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0',
      },
      dependencies: {
        react: '^16.2.0',
      },
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  install() {
    this.npmInstall();
    this.log('Writing files... 📝');

    const { type, name } = this.answers;
    if (type === 'screen') {
      this.fs.copyTpl(
        this.templatePath('form.html'),
        this.destinationPath(`components/${name}.js`),  
        {
          name,
        },
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('module.js'),
        this.destinationPath(`modules/${name.toLowerCase()}.js`),
        {
          name,
        },
      );
    }
  }

  // last stage
  end() {
    this.log('Scaffolding created successfully Bye... 👋');
  }
};
