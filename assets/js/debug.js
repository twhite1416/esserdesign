// Ensure that the MMI "namespace" is available.
if(typeof(window['MMI']) == 'undefined') {
    window.MMI = {};
}

MMI.Debug = {
    _attemptsToFindConsole: 0,
    _maximumAttemptsToFindConsole: 3,
    _millisecondsBetweenAttemptsToFindConsole: 1000,
    config: {
        log: false,
        error: false,
        warn: false,
        info: false,
        hasConsole: false,
        hasConsoleLog: false,
        hasConsoleClear: false,
        hasConsoleError: false,
        hasConsoleWarn: false,
        hasConsoleInfo: false,
        defaultArgumentDetailLevel: 2
    },
    init: function() {
        MMI.Debug.config.hasConsole = (typeof(window.console) == 'object' && window.console != null);
        if(MMI.Debug.config.hasConsole) {
            MMI.Debug.config.hasConsoleLog = (jQuery.inArray(typeof(window.console.log), ['function', 'object']) > -1);
            MMI.Debug.config.hasConsoleClear = (jQuery.inArray(typeof(window.console.clear), ['function', 'object']) > -1);
            MMI.Debug.config.hasConsoleError = (jQuery.inArray(typeof(window.console.error), ['function', 'object']) > -1);
            MMI.Debug.config.hasConsoleWarn = (jQuery.inArray(typeof(window.console.warn), ['function', 'object']) > -1);
            MMI.Debug.config.hasConsoleInfo = (jQuery.inArray(typeof(window.console.info), ['function', 'object']) > -1);
        } else if(MMI.Debug._attemptsToFindConsole < MMI.Debug._maximumAttemptsToFindConsole) {
            MMI.Debug._attemptsToFindConsole++;
            setTimeout(MMI.Debug.init, MMI.Debug._millisecondsBetweenAttemptsToFindConsole);
        }
        window.clog = MMI.Debug.log;
        window.clarg = MMI.Debug.logArgs;
        window.cclear = MMI.Debug.clear;
        window.cerror = MMI.Debug.error;
        window.cwarn = MMI.Debug.warn;
        window.cinfo = MMI.Debug.info;
    },
    _hasConsole: function() {
        return MMI.Debug.config.hasConsole;
    },
    _hasConsoleLog: function() {
        return MMI.Debug.config.hasConsoleLog;
    },
    _hasConsoleClear: function() {
        return MMI.Debug.config.hasConsoleClear;
    },
    _hasConsoleError: function() {
        return MMI.Debug.config.hasConsoleError;
    },
    _hasConsoleWarn: function() {
        return MMI.Debug.config.hasConsoleWarn;
    },
    _hasConsoleInfo: function() {
        return MMI.Debug.config.hasConsoleInfo;
    },
    _getDefaultArgumentDetailLevel: function() {
        return MMI.Debug.config.defaultArgumentDetailLevel;
    },
    _getConsoleActionMode: function(argLen, outputType) {
        if(argLen && MMI.Debug.config[outputType] && MMI.Debug._hasConsole()) {
            return 1; // Allow logging
        }
        return false; // Do not log to console
    },
    log: function() {
        var args = Array.prototype.slice.call(arguments);
        var argsLength = args.length;
        var mode = MMI.Debug._getConsoleActionMode( argsLength, 'log' );
        if( mode > 0 ) {
            if( MMI.Debug._hasConsoleLog() && argsLength ) {
                for( var i = argsLength; i >= 1; i-- ) {
                    console.log( args[ argsLength - i ] );
                }
            }
        }
    },
    logFn: function(methodName, argsArray) {
        var args = Array.prototype.slice.call(arguments);
        var argsLength = args.length;
        var mode = MMI.Debug._getConsoleActionMode(argsLength, 'log');
        if(mode > 0) {
            if(MMI.Debug._hasConsoleLog()) {
                if(argsLength == 2) {
                    clog(methodName + '() =>', argsArray);
                } else {
                    clog(methodName + '();');
                }
            }
        }
    },
    clear: function() {
        if( MMI.Debug._hasConsoleClear() ) {
            console.clear();
        }
    },
    logArgs: function(args, detailLevel, methodName) {
        var mode = MMI.Debug._getConsoleActionMode(arguments.length, 'log');
        if(mode > 0) {
            if(MMI.Debug._hasConsoleLog() && typeof(args) != 'undefined' && typeof(args['callee']) != 'undefined' && typeof(args['length']) != 'undefined') {
                methodName = methodName ? methodName : 'unknown';
                // Log the callee
                var callee = args.callee.toString();
                detailLevel = (typeof(detailLevel) == 'number') ? detailLevel : MMI.Debug._getDefaultArgumentDetailLevel();
                if(detailLevel > 0) {
                    console.log(methodName + callee.slice(9, callee.indexOf(')')+1) + ' :: Received [' + args.length + '] Arguments');
                    if(detailLevel > 1) {
                        console.log(args);
                    }
                } else {
                    // Modify args.callee and log it
                    console.log(methodName + callee.slice(9, callee.indexOf('(')) + ' :: Received [' + args.length + '] Arguments');
                }
            }
        }
    },
    error: function() {
        var args = Array.prototype.slice.call(arguments);
        var argsLength = args.length;
        var mode = MMI.Debug._getConsoleActionMode( argsLength, 'error' );
        if( mode > 0 ) {
            if( MMI.Debug._hasConsoleError() && argsLength ) {
                for( var i = argsLength; i >= 1; i-- ) {
                    console.error( args[ argsLength - i ]);
                }
            }
        }
    },
    warn: function() {
        var args = Array.prototype.slice.call(arguments);
        var argsLength = args.length;
        var mode = MMI.Debug._getConsoleActionMode( argsLength, 'warn' );
        if( mode > 0 ) {
            if( MMI.Debug._hasConsoleWarn() && argsLength ) {
                for( var i = argsLength; i >= 1; i-- ) {
                    console.warn( args[ argsLength - i ] );
                }
            }
        }
    },
    info: function() {
        var args = Array.prototype.slice.call(arguments);
        var argsLength = args.length;
        var mode = MMI.Debug._getConsoleActionMode( argsLength, 'info' );
        if( mode > 0 ) {
            if( MMI.Debug._hasConsoleInfo() && argsLength ) {
                for( var i = argsLength; i >= 1; i-- ) {
                    console.info( args[ argsLength - i ] );
                }
            }
        }
    }
};
MMI.Debug.init();
MMI.Debug.config.log = true;
MMI.Debug.config.error = true;
MMI.Debug.config.warn = true;
MMI.Debug.config.info = true;
var clog = MMI.Debug.log;
var permaclog = clog;
var clogfn = MMI.Debug.logFn;
var clarg = MMI.Debug.logArgs;
var cclear = MMI.Debug.clear;
var cerror = MMI.Debug.error;
var cwarn = MMI.Debug.warn;
var cinfo = MMI.Debug.info;