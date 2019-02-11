#!/usr/bin/env node

'use strict';
const readline = require('readline');
const validateProjectName = require('validate-npm-package-name');
const chalk = require('chalk');
const commander = require('commander');
const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn');
const Promise = require('bluebird');
const ora = require('ora');
const emoji = require('node-emoji')

const packageJson = require('./package.json');

let projectName;

commander
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')}`)
    .action(name => {
        projectName = name;
    })
    .parse(process.argv);

if (typeof projectName === 'undefined') {
    console.error('Please specify the project directory:');
    console.log(
        `  ${chalk.cyan(commander.name())} ${chalk.green('<project-directory>')}`
    );
    console.log();
    console.log('For example:');
    console.log(`  ${chalk.cyan(commander.name())} ${chalk.green('my-react-app')}`);
    console.log();
    process.exit(1);
}

createApp(projectName);

function createApp(name) {
    const root = path.resolve(name);
    const appName = path.basename(root);
    const useYarn = shouldUseYarn();

    checkAppName(appName);
    validateDir(root, appName)
        .then(function () {
            process.chdir(root);
            initGit();
            console.log(chalk.cyan(`${emoji.find('sparkles').emoji} git has been successfully initialized`));
        })
        .then(function () {
            const spinner = ora().start();
            spinner.color = 'yellow';
            spinner.text = 'Creating the project directory and it may take few minutes.';
            return fs.copy(path.resolve(__dirname, 'template'), root)
                .then(() => {
                    spinner.stop();
                });
        })
        .then(function () {
            return saveProjectName(root, appName);
        })
        .then(function () {
            console.log(chalk.cyan(`${emoji.find('sparkles').emoji} ${appName} Project directory has been successfully created`));
            console.log('Starts installing dependencies and it may take few minutes')
            return installDependencies(useYarn);
        })
        .then(function () {
            showSuccessMessage(root, appName, useYarn);
        })
        .catch(function (err) {
            console.log(chalk.red('Error'));
            console.error(err);
        })
}

function checkAppName(appName) {
    const validationResult = validateProjectName(appName);
    if (!validationResult.validForNewPackages) {
        console.error(
            `Could not create a project called ${chalk.red(`"${appName}"`)} because of npm naming restrictions:`
        );
        printValidationResults(validationResult.errors);
        printValidationResults(validationResult.warnings);
        process.exit(1);
    }
}

function printValidationResults(results) {
    if (typeof results !== 'undefined') {
        results.forEach(error => {
            console.error(chalk.red(`  *  ${error}`));
        });
    }
}

function shouldUseYarn() {
    try {
        execSync('yarnpkg --version', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

function initGit() {
    execSync('git init');
}

function validateDir(dir, appName) {
    const isExist = fs.existsSync(dir);

    if (!isExist) {
        return fs.ensureDir(dir);
    }

    const stat = fs.statSync(dir);
    if (stat.isDirectory()) {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question(`Folder ${appName} already exists, continuing operation may result in overwriting of existing files, whether to continue y/n ?`, (answer) => {
                rl.close();
                if (!answer || answer !== 'y') {
                    process.exit(1);
                } else {
                    return resolve();
                }
            });
        });
    } else {
        console.error(
            `${chalk.red(`"${appName}"`)} Already exists, please reassign the project name`
        );
        process.exit(1);
    }
}

function installDependencies(useYarn) {
    let command;
    let args;

    if (useYarn) {
        command = 'yarn';
    } else {
        command = 'npm';
        args = ['install'];
    }

    return new Promise(function (resolve, reject) {
        const child = spawn(command, args, { stdio: 'inherit' });
        child.on('close', code => {
            if (code !== 0) {
                reject({
                    command: `${command} ${args.join(' ')}`,
                });
                return;
            }
            resolve();
        });
    });
}

function saveProjectName(root, name) {
    const filePath = path.join(root, 'package.json');
    const packageJson = require(filePath);
    packageJson.name = name;

    return fs.writeJson(filePath, packageJson, { spaces: 4 });
}

function showSuccessMessage(root, appName, useYarn) {
    const displayedCommand = useYarn ? 'yarn' : 'npm';

    console.log()
    console.log(chalk.green(`${emoji.find('sparkles').emoji} Success! Created ${appName} at ${root}`));
    console.log();
    console.log('Inside that directory, you can run several commands:');
    console.log();
    console.log(chalk.cyan(`  ${displayedCommand} dev`));
    console.log('    Starts the development server.');
    console.log();
    console.log(chalk.cyan(`  ${displayedCommand} prod`));
    console.log('    Starts the production server.');
    console.log();
    console.log(
        chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build:dev`)
    );
    console.log('    Bundles the app into static files for development.');
    console.log();
    console.log(
        chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build:prod`)
    );
    console.log('    Bundles the app into static files for production.');
    console.log();
    console.log(
        chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}test`)
    );
    console.log('    Run the tests.');
    console.log();
}