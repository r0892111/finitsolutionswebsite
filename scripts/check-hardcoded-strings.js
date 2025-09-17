#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns to ignore
const IGNORE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /\.git/,
  /messages\//,
  /locales\//,
  /\.config\./,
  /\.test\./,
  /\.spec\./,
  /\.stories\./,
  /check-hardcoded-strings\.js/
];

// File extensions to check
const EXTENSIONS = ['tsx', 'ts', 'jsx', 'js'];

// Regex to find potential hardcoded strings
const HARDCODED_STRING_REGEX = /(['"`])([A-Za-z\s]{3,})\1/g;

// Allowed hardcoded strings (technical terms, etc.)
const ALLOWED_STRINGS = [
  'className',
  'onClick',
  'onChange',
  'onSubmit',
  'href',
  'src',
  'alt',
  'id',
  'type',
  'name',
  'value',
  'placeholder',
  'aria-label',
  'role',
  'tabIndex',
  'target',
  'rel',
  'method',
  'action',
  'encType',
  'accept',
  'multiple',
  'required',
  'disabled',
  'readOnly',
  'autoComplete',
  'autoFocus',
  'checked',
  'selected',
  'hidden',
  'open',
  'closed',
  'loading',
  'error',
  'success',
  'warning',
  'info',
  'primary',
  'secondary',
  'default',
  'outline',
  'ghost',
  'link',
  'sm',
  'md',
  'lg',
  'xl',
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
  'HEAD',
  'OPTIONS',
  'application/json',
  'text/html',
  'text/plain',
  'multipart/form-data',
  'utf-8',
  'en',
  'nl',
  'en-US',
  'nl-NL',
  'nl-BE'
];

function shouldIgnoreFile(filePath) {
  return IGNORE_PATTERNS.some(pattern => pattern.test(filePath));
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];

  lines.forEach((line, lineNumber) => {
    let match;
    while ((match = HARDCODED_STRING_REGEX.exec(line)) !== null) {
      const string = match[2];
      
      // Skip if it's an allowed string
      if (ALLOWED_STRINGS.includes(string)) continue;
      
      // Skip if it's a translation key (contains dots)
      if (string.includes('.')) continue;
      
      // Skip if it's a URL or path
      if (string.startsWith('http') || string.startsWith('/') || string.startsWith('./')) continue;
      
      // Skip if it's a CSS class or style
      if (string.includes('-') && string.length < 20) continue;
      
      // Skip if it's a technical term or code
      if (/^[a-z]+[A-Z]/.test(string)) continue; // camelCase
      if (/^[A-Z_]+$/.test(string)) continue; // CONSTANTS
      
      issues.push({
        file: filePath,
        line: lineNumber + 1,
        string: string,
        context: line.trim()
      });
    }
  });

  return issues;
}

function main() {
  const files = EXTENSIONS.flatMap(ext => 
    glob.sync(`**/*.${ext}`, { ignore: ['node_modules/**'] })
  ).filter(file => !shouldIgnoreFile(file));

  let totalIssues = 0;
  const allIssues = [];

  files.forEach(file => {
    const issues = checkFile(file);
    if (issues.length > 0) {
      totalIssues += issues.length;
      allIssues.push(...issues);
    }
  });

  if (totalIssues > 0) {
    console.log(`❌ Found ${totalIssues} potential hardcoded strings:\n`);
    
    allIssues.forEach(issue => {
      console.log(`${issue.file}:${issue.line}`);
      console.log(`  String: "${issue.string}"`);
      console.log(`  Context: ${issue.context}`);
      console.log('');
    });
    
    process.exit(1);
  } else {
    console.log('✅ No hardcoded strings found!');
    process.exit(0);
  }
}

main();