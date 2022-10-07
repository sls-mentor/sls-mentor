"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompleteRuleErrorMessage = void 0;
const getCompleteRuleErrorMessage = (specificMessage, fileName) => `${specificMessage}.\nSee (https://github.com/Kumo-by-Theodo/guardian/blob/master/src/rules/${fileName}/${fileName}.md) for impact and how to resolve.`;
exports.getCompleteRuleErrorMessage = getCompleteRuleErrorMessage;
