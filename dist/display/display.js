"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayGuordle = exports.displayError = exports.displayChecksStarting = exports.displayFailedChecksDetails = exports.displayResultsSummary = void 0;
const chalk_1 = __importDefault(require("chalk"));
const types_1 = require("../types");
const helpers_1 = require("../helpers");
const displayRuleResults = (ruleName, successCount, totalCount) => {
    if (totalCount === 0)
        return console.log(`${ruleName} - no resources checked`);
    const successRatio = successCount / totalCount;
    const percentage = Math.round(successRatio * 100 * 100) / 100;
    const message = `${ruleName} - ${percentage}% of resources passed (${successCount}/${totalCount})\n`;
    if (successRatio <= 0.5)
        return console.log(chalk_1.default.red(message));
    if (successRatio <= 0.7)
        return console.log(chalk_1.default.yellow(message));
    return console.log(chalk_1.default.green(message));
};
const displayResultsSummary = (results) => {
    console.log('--- Checks summary ---\n');
    results.forEach(({ rule, result }) => {
        const successCount = result.filter(e => e.success).length;
        displayRuleResults(rule.ruleName, successCount, result.length);
    });
};
exports.displayResultsSummary = displayResultsSummary;
const displayFailedChecksDetails = (results) => {
    console.log('--- Failed checks details ---\n');
    const resultsByResource = (0, helpers_1.getResultsByResource)(results);
    resultsByResource.forEach(({ resourceArn, failedRules }) => {
        const resourceNotPassingMessage = `Resource ${chalk_1.default.bold(resourceArn)} --> ${failedRules.length} rules failed`;
        console.log(chalk_1.default.redBright(resourceNotPassingMessage));
        failedRules.forEach(({ rule, extras }) => {
            const ruleFalingMessage = `   - ${chalk_1.default.bold(rule.ruleName)} (${chalk_1.default.grey((0, helpers_1.getCompleteRuleErrorMessage)(rule.errorMessage, rule.fileName))})`;
            const extrasMessage = Object.keys(extras).reduce((prev, extra) => `${prev}      - ${extra} : ${extras[extra]}\n`, '');
            console.log(`${ruleFalingMessage}\n${extrasMessage}`);
        });
    });
};
exports.displayFailedChecksDetails = displayFailedChecksDetails;
const displayChecksStarting = () => {
    console.log(chalk_1.default.blueBright.bold('--- Running checks ---\n'));
};
exports.displayChecksStarting = displayChecksStarting;
const displayError = (errorMessage) => {
    console.error(`\n${chalk_1.default.redBright(errorMessage)}\n`);
};
exports.displayError = displayError;
const getEmojiFromScore = (score) => {
    if (score > types_1.MEDIUM_SCORE_THRESHOLD)
        return '🟩';
    if (score > types_1.LOW_SCORE_THRESHOLD)
        return '🟨';
    return '🟥';
};
const displayGuordle = (checksResultsByCategory) => {
    const guordle = Object.values(checksResultsByCategory)
        .map(getEmojiFromScore)
        .join('');
    console.log(chalk_1.default.bold(`\nShare your results on twitter: ${guordle} #guardian #guordle`));
};
exports.displayGuordle = displayGuordle;
