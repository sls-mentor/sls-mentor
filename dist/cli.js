#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGuardianChecksCommand = void 0;
const commander_1 = require("commander");
const index_1 = require("./index");
const display_1 = require("./display");
const getResultsByCategory_1 = require("./helpers/getResultsByCategory");
const hasKeyAndValue = (groups) => {
    // ts-config is loosely assuming all keys exist, type guard to be updated when Typescript config is updated
    return groups !== undefined;
};
const parseTags = (tagOption, previousTags) => {
    const [{ groups: tag }] = [
        ...tagOption.matchAll(/^Key=(?<key>[\p{L}\p{Z}\p{N}_.:/=+\-@]*),Value=(?<value>[\p{L}\p{Z}\p{N}_.:/=+\-@]*)$/gu),
    ];
    if (!hasKeyAndValue(tag)) {
        throw new commander_1.InvalidArgumentError('Invalid flag parameters');
    }
    if (!previousTags) {
        return [tag];
    }
    return [...previousTags, tag];
};
const handleGuardianChecksCommand = (options) => __awaiter(void 0, void 0, void 0, function* () {
    (0, display_1.displayChecksStarting)();
    const results = yield (0, index_1.runGuardianChecks)(options);
    const atLeastOneFailed = results.some(({ result }) => result.filter(resource => !resource.success).length > 0);
    if (!options.short && atLeastOneFailed) {
        (0, display_1.displayFailedChecksDetails)(results);
    }
    (0, display_1.displayResultsSummary)(results);
    const resultsByCategory = (0, getResultsByCategory_1.getResultsByCategory)(results);
    (0, display_1.displayDashboard)(resultsByCategory);
    (0, display_1.displayGuordle)(resultsByCategory);
    const processExit = !options.noFail && atLeastOneFailed ? 1 : 0;
    process.exit(processExit);
});
exports.handleGuardianChecksCommand = handleGuardianChecksCommand;
const setAwsProfile = (command) => {
    const awsProfile = command.opts().awsProfile;
    if (awsProfile !== undefined) {
        process.env.AWS_PROFILE = awsProfile;
    }
};
const setAwsRegion = (command) => {
    const awsRegion = command.opts().awsRegion;
    if (awsRegion !== undefined) {
        process.env.AWS_REGION = awsRegion;
    }
};
commander_1.program
    .name('guardian')
    .version((_a = process.env.npm_package_version) !== null && _a !== void 0 ? _a : '0.0.0')
    .option('-s, --short', 'Short output: only display checks results overview', false)
    .option('-p, --aws-profile <profile>', 'AWS profile to use')
    .option('-r, --aws-region <region>', 'Specify region')
    .option('-t, --tags <key_value...>', 'Filter checked account resources by tags', parseTags)
    .option('-c, --cloudformations [cloudformations...]', 'Filter checked account resources by cloudformation stacks names')
    .option('--noFail', 'Exit with success status, even if some checks failed', false)
    .action(exports.handleGuardianChecksCommand)
    .hook('preAction', setAwsProfile)
    .hook('preAction', setAwsRegion)
    .parse();
