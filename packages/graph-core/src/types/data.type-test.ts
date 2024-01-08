import { Test } from 'ts-toolbelt';

import { SupportedARN } from '@sls-mentor/arn';

import { Node } from './data';

const { check, checks } = Test;

// All SupportedARNs should be present in Node union
checks([check<Node['arn'], SupportedARN, Test.Pass>()]);
