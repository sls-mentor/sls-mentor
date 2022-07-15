Async calls to lambdas don't provide any response to the resource that preformed them.
That's why there should always be a failure destination specified for all your asynchronous Lambda, in order to be able to process the potential failure of any call.
