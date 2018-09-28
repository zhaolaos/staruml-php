/*
 * Copyright (c) 2014-2018 MKLab. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */
const codeGenerator = require("./code-generator")

function getGenOptions() {
    return {
        phpDoc       : app.preferences.get("php.gen.phpDoc"),
        useTab        : app.preferences.get("php.gen.useTab"),
        indentSpaces  : app.preferences.get("php.gen.indentSpaces"),
        classExtension : app.preferences.get("php.gen.classExtension"),
        interfaceExtension : app.preferences.get("php.gen.interfaceExtension"),
        phpStrictMode : app.preferences.get("php.gen.phpStrictMode"),
        phpReturnType : app.preferences.get("php.gen.phpReturnType")
    }
}

function getRevOptions () {
    return {
        association: app.preferences.get('php.rev.association'),
        publicOnly: app.preferences.get('php.rev.publicOnly'),
        typeHierarchy: app.preferences.get('php.rev.typeHierarchy'),
        packageOverview: app.preferences.get('php.rev.packageOverview'),
        packageStructure: app.preferences.get('php.rev.packageStructure')
    }
}
/**
 * Command Handler for PHP Generate
 *
 * @param {Element} base
 * @param {string} path
 * @param {Object} options
 * @return {$.Promise}
 */
function _handleGenerate(base, path, options) {
    //var result = new $.Deferred();

    // If options is not passed, get from preference
    options = options || getGenOptions();

    // If base is not assigned, popup ElementPicker
    if (!base) {
        app.elementPickerDialog.showDialog("Select a base model to generate codes", null, type.UMLPackage).then(function ({buttonId, retrunValue}) {
                if (buttonId === 'ok') {
                    base = retrunValue
                    // If path is not assigned, popup Open Dialog to select a folder
                    if (!path) {
                        var files= app.dialogs.showOpenDialog("Select a folder where generated codes to be located", null, null, { properties: [ 'openDirectory' ] })
                        if (files && files.length > 0) {
                            path = files[0]
                            codeGenerator.generate(base, path, options)
                        }
                    } else {
                        codeGenerator.generate(base, path, options)
                    }
                }
            })
    } else {
        // If path is not assigned, popup Open Dialog to select a folder
        if (!path) {
            var files = app.dialogs.showOpenDialog("Select a folder where generated codes to be located", null, null, { properties: [ 'openDirectory' ] })
            if (files && files.length > 0) {
                path = files[0]
                codeGenerator.generate(base, path, options)
            }
        } else {
            codeGenerator.generate(base, path, options)
        }
    }
}

/**
 * Command Handler for PHP Reverse
 *
 * @param {string} basePath
 * @param {Object} options
 * @return {$.Promise}
 */
function _handleReverse(basePath, options) {
    //var result = new $.Deferred();

    // If options is not passed, get from preference
    options = getRevOptions()

    // If basePath is not assigned, popup Open Dialog to select a folder
    if (!basePath) {
        var files = app.dialogs.showOpenDialog("Select Folder", null, null, { properties: [ 'openDirectory' ] })
        if (files && files.length > 0) {
            basePath = files[0]
            codeAnalyzer.analyze(basePath, options)
        }
    }
}


/**
 * Popup PreferenceDialog with PHP Preference Schema
 */
function _handleConfigure() {
    app.commands.execute('application:preferences', 'php')
}

function init () {
    app.commands.register('php:generate', _handleGenerate)
    app.commands.register('php:configure', _handleConfigure)
    }
    
exports.init = init
