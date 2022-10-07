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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runGuardianChecks = void 0;
const intersectionWith_1 = __importDefault(require("lodash/intersectionWith"));
const cli_progress_1 = __importDefault(require("cli-progress"));
const client_lambda_1 = require("@aws-sdk/client-lambda");
const helpers_1 = require("./helpers");
const rules_1 = require("./rules");
const display_1 = require("./display");
const fetchResourceArns = (cloudformations, tags) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (cloudformations === undefined) {
            return yield (0, helpers_1.fetchTaggedResourceArns)(tags !== null && tags !== void 0 ? tags : []);
        }
        const resourcesFetchedByStack = yield (0, helpers_1.fetchCloudFormationResourceArns)(cloudformations);
        if (tags === undefined) {
            return resourcesFetchedByStack;
        }
        const resourcesFetchedByTags = yield (0, helpers_1.fetchTaggedResourceArns)(tags);
        return (0, intersectionWith_1.default)(resourcesFetchedByStack, resourcesFetchedByTags, (arnA, arnB) => arnA.resource === arnB.resource && arnA.service === arnB.service);
    }
    catch (error) {
        console.log(error);
        (0, display_1.displayError)(`Unable to fetch AWS resources, check that profile "${(_a = process.env.AWS_PROFILE) !== null && _a !== void 0 ? _a : ''}" is correctly set or specify another profile using -p option`);
        process.exit(1);
    }
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const runGuardianChecks = ({ cloudformations, tags, }) => __awaiter(void 0, void 0, void 0, function* () {
    const resourceArns = yield fetchResourceArns(cloudformations, tags);
    const rules = [
        rules_1.LightBundleRule,
        rules_1.NoIdenticalCode,
        rules_1.noDefaultMemory,
        rules_1.NoMaxTimeout,
        rules_1.NoSharedIamRoles,
        rules_1.UseArm,
        rules_1.UseIntelligentTiering,
        rules_1.LimitedAmountOfLambdaVersions,
        rules_1.UnderMaxMemory,
        rules_1.AsyncSpecifyFailureDestination,
        rules_1.SpecifyDlqOnSqs,
    ];
    const total = rules.length + 1;
    const progressBar = new cli_progress_1.default.SingleBar({}, cli_progress_1.default.Presets.rect);
    progressBar.start(total, 0);
    const decreaseRemaining = () => {
        progressBar.increment();
    };
    decreaseRemaining();
    try {
        const results = yield Promise.all(rules.map((rule) => __awaiter(void 0, void 0, void 0, function* () {
            const ruleResult = (yield rule.run(resourceArns)).results;
            decreaseRemaining();
            return { rule, result: ruleResult };
        })));
        progressBar.stop();
        return results;
    }
    catch (error) {
        progressBar.stop();
        if (error instanceof client_lambda_1.TooManyRequestsException) {
            (0, display_1.displayError)('Too many requests sent to AWS, try to reduce the scope of your analysis by specifying filters on your cloudformation stacks (-c), or resource tags (-t).');
        }
        process.exit(1);
    }
});
exports.runGuardianChecks = runGuardianChecks;
