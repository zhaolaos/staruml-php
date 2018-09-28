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


/**
 * CodeWriter
 */

class CodeWriter {

    /**
     * @constructor
     */
    constructor(indentString) {

        /** @member {Array.<string>} lines */
        this.lines = []

        /** @member {string} indentString */
        this.indentString = indentString || "    " // default 4 spaces

        /** @member {Array.<string>} indentations */
        this.indentations = []

        /** @member {Array} section */
        this.sections = [];
    }

    /**
     * Indent
     */
    indent () {
        this.indentations.push(this.indentString)
    }

    /**
     * Outdent
     */
    outdent () {
        this.indentations.splice(this.indentations.length - 1, 1)
    }

    /**
     * Write a line
     * @param {string} line
     */
    writeLine (line) {
        if (line) {
            this.lines.push(this.indentations.join("") + line)
        } else {
            this.lines.push("")
        }
    }

    /**
     * Add named section to ba able to write lines in it
     * @param {string} line
     * @param {boolean} uniqueItems
     */
    addSection (name, uniqueItems) {
        uniqueItems = uniqueItems || false;

        if (!this.sections.includes({name: name})) {
            this.sections.push({
                name: name,
                line: this.lines.length,
                indentations: this.indentations,
                insertEmptyLine: true,
                uniqueItems: uniqueItems,
                items: []
            })
        }
    }

    /**
     * Write a line in section
     * @param {string} line
     * @param {string} name
     */
    writeLineInSection (line, name) {
        var section = this.sections.find({name: name})
        if (section) {
            if (line && (!section.uniqueItems || !section.items.includes(line))) {
                this.lines.splice(section.line, 0, section.indentations.join("") + line)
                section.items.push(line)
            } else {
                this.lines.splice(section.line, 0, "")
            }
            section.line++
            if (section.insertEmptyLine) {
                this.lines.splice(section.line, 0, "")
                section.insertEmptyLine = false
            }
        }
    }
    
    /**
     * Return as all string data
     * @return {string}
     */
    getData () {
        return this.lines.join("\n")
    }
}

exports.CodeWriter = CodeWriter

