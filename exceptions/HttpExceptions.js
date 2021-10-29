'use strict';

const util = require('util');
const enums = require('./ErrorMessages');

function HttpException(status, message) {
    this.status = status;
    this.errorCode = status;
    this.message = message;

    this.getStatus = function () { return this.status; };
    this.getErrorCode = function () { return this.errorCode; };
    this.getMessage = function () { return this.message; };
}

function HttpErrorCodeException(status, errorCode, fieldName, fieldValue, messages) {
    this.code = errorCode;
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    // create the http response body
    var message;
    if (typeof fieldValue !== 'undefined') {
        message = { code: errorCode, fieldName: fieldName, fieldValue: fieldValue };
    } else if (typeof fieldName !== 'undefined') {
        message = { code: errorCode, fieldName: fieldName };
    } else {
        message = { code: errorCode };
    }
    message.messageCode = messages.messageCode;
    message.message = messages.message;

    HttpException.call(this, status, message);

    this.getStatus = function () { return this.status; };
    this.getErrorCode = function () { return this.errorCode; };
    this.getFieldName = function () { return this.fieldName; };
    this.getFieldValue = function () { return this.fieldValue; };
}

util.inherits(HttpErrorCodeException, HttpException);

function CommonHttpErrorException(errorcode, fieldName, fieldValue, insteadValue) {
    var ErrorCodes = enums.ErrorCodes;
    var messages = {};
    if (ErrorCodes[errorcode]) {

        var httpEerrorCode = ErrorCodes[errorcode];

        if (insteadValue !== null && insteadValue !== undefined) {
            httpEerrorCode = JSON.parse(util.format(JSON.stringify(httpEerrorCode), insteadValue, insteadValue));
        }

        messages = {
            messageCode: errorcode,
            message: httpEerrorCode.ERROR_MESSAGE
        };
    }

    HttpErrorException.call(this, ErrorCodes[errorcode].STATUS, fieldName, fieldValue, messages);
}

util.inherits(CommonHttpErrorException, HttpErrorCodeException);

function CommonHttpError(errorMsg) {
    let errMsg = errorMsg.err_msg;
    let fieldName = errorMsg.field_name;
    let fieldValue = errorMsg.field_value;
    HttpErrorException.call(this, errMsg.status, fieldName, fieldValue, errMsg.msg);
}

util.inherits(CommonHttpError, HttpErrorCodeException);

function HttpErrorException(status, fieldName, fieldValue, messages) {
    var errorCode;
    if (status === 400) {
        errorCode = 'INVALID_PARAMETER';
    } else if (status === 401) {
        errorCode = 'PERMISSION_NOT_ALLOWED';
    } else if (status === 403) {
        errorCode = 'OPERATION_NOT_PERMISSION';
    } else if (status === 404) {
        errorCode = 'DATA_NOT_EXIST';
    } else if (status === 409) {
        errorCode = 'DATA_CONFLICTED';
    } else if (status === 500) {
        errorCode = 'SERVER_ERROR';
    } else {
        errorCode = 'SERVER_ERROR';
    }

    HttpErrorCodeException.call(this, status, errorCode, fieldName, fieldValue, messages);

}

util.inherits(HttpErrorException, HttpErrorCodeException);


function InvalidParameterException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 400, 'INVALID_PARAMETER', fieldName, fieldValue, messages);
}

util.inherits(InvalidParameterException, HttpErrorCodeException);

function AccountNotExistsException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 400, 'ACCOUNT_NOT_EXISTS', fieldName, fieldValue, messages);
}

util.inherits(AccountNotExistsException, HttpErrorCodeException);

function PasswordErrorException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 400, 'PASSWORD_ERROR', fieldName, fieldValue, messages);
}

util.inherits(PasswordErrorException, HttpErrorCodeException);

function VerificationCodeInvalidException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 400, 'VERIFICATION_CODE_INVALID', fieldName, fieldValue, messages);
}

util.inherits(VerificationCodeInvalidException, HttpErrorCodeException);

function VerificationCodeExpiredException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 400, 'VERIFICATION_CODE_EXPIRED', fieldName, fieldValue, messages);
}

util.inherits(VerificationCodeExpiredException, HttpErrorCodeException);


function StripeCardTokenNotExistsException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 400, 'STRIPE_CARD_TOKEN_NOT_EXISTS', fieldName, fieldValue, messages);
}

util.inherits(StripeCardTokenNotExistsException, HttpErrorCodeException);

function StripeCardTokenAlreadyUsedException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 400, 'STRIPE_CARD_TOKEN_ALREADY_USED', fieldName, fieldValue, messages);
}

util.inherits(StripeCardTokenAlreadyUsedException, HttpErrorCodeException);

function StripeUserNotExistsException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 400, 'STRIPE_USER_NOT_EXISTS', fieldName, fieldValue, messages);
}
util.inherits(StripeUserNotExistsException, HttpErrorCodeException);

function StripeAmountNotMatch(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 400, 'STRIPE_AMOUNT_NOT_MATCH', fieldName, fieldValue, messages);
}
util.inherits(StripeAmountNotMatch, HttpErrorCodeException);


function PermissionNotAllowedException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 401, 'PERMISSION_NOT_ALLOWED', fieldName, fieldValue, messages);
}

util.inherits(PermissionNotAllowedException, HttpErrorCodeException);


function AccountInvalidException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 401, 'ACCOUNT_INVALID', fieldName, fieldValue, messages);
}

util.inherits(AccountInvalidException, HttpErrorCodeException);


function OperationNotPermissionException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 403, 'OPERATION_NOT_PERMISSION', fieldName, fieldValue, messages);
}

util.inherits(OperationNotPermissionException, HttpErrorCodeException);

function ResourceNotFoundException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 404, 'DATA_NOT_EXIST', fieldName, fieldValue, messages);
}

util.inherits(ResourceNotFoundException, HttpErrorCodeException);

function DataConflictedException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 409, 'DATA_CONFLICTED', fieldName, fieldValue, messages);
}
util.inherits(DataConflictedException, HttpErrorCodeException);

function EmailAlreadyInuseException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 409, 'EMAIL_ALREADY_INUSE', fieldName, fieldValue, messages);
}
util.inherits(EmailAlreadyInuseException, HttpErrorCodeException);

function MobileAlreadyInuseException(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 409, 'MOBILE_ALREADY_INUSE', fieldName, fieldValue, messages);
}
util.inherits(MobileAlreadyInuseException, HttpErrorCodeException);

function ErrorInServer(fieldName, fieldValue, messages) {
    HttpErrorCodeException.call(this, 500, "SERVER_ERROR", fieldName, fieldValue, messages);
}
util.inherits(ErrorInServer, HttpErrorCodeException);

module.exports.InvalidParameterException = InvalidParameterException;
module.exports.PermissionNotAllowedException = PermissionNotAllowedException;
module.exports.AccountNotExistsException = AccountNotExistsException;
module.exports.PasswordErrorException = PasswordErrorException;
module.exports.VerificationCodeInvalidException = VerificationCodeInvalidException;
module.exports.VerificationCodeExpiredException = VerificationCodeExpiredException;
module.exports.ResourceNotFoundException = ResourceNotFoundException;
module.exports.AccountInvalidException = AccountInvalidException;
module.exports.DataConflictedException = DataConflictedException;
module.exports.EmailAlreadyInuseException = EmailAlreadyInuseException;
module.exports.MobileAlreadyInuseException = MobileAlreadyInuseException;
module.exports.OperationNotPermissionException = OperationNotPermissionException;
module.exports.StripeCardTokenNotExistsException = StripeCardTokenNotExistsException;
module.exports.StripeCardTokenAlreadyUsedException = StripeCardTokenAlreadyUsedException;
module.exports.StripeAmountNotMatch = StripeAmountNotMatch;
module.exports.StripeUserNotExistsException = StripeUserNotExistsException;
module.exports.CommonHttpErrorException = CommonHttpErrorException;
module.exports.CommonHttpError = CommonHttpError;
module.exports.HttpErrorException = HttpErrorException;
module.exports.ErrorInServer = ErrorInServer;