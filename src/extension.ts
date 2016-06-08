'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import {window, commands, workspace, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';

export function activate(context: ExtensionContext) {

    let encourager = new Encourager();

    let disposable = commands.registerCommand('encourage.toggle', () => {
        encourager.updateEncourageMessage();
    });
    
    workspace.onDidSaveTextDocument((e) => {
        encourager.updateEncourageMessage();
    });
    
    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(encourager);
    context.subscriptions.push(disposable);
}

export function deactivate() {
}

class Encourager {

    private _statusBarItem: StatusBarItem;
    private _encouragements = [
    'Nice Job! 🎇',
    'Way to go! ✨',
    'Wow, nice change! 💗',
    'So good! 💖',
    'Bravo! 👏',
    'You rock! 🚀',
    'Well done! 🎉',
    'I see what you did there! 🙏',
    'Genius work! 🍩',
    'Thumbs up! 👍',
    'Coding win! 🍸',
    'FTW! ⚡️',
    'Yep! 🙆',
    'Nnnnnnnailed it! ✌',
    'You\'re good enough! 😎',
    'You\'re smart enough! 💫',
    'People like you! 💞'
    ];
    
    private getRandomEncouragement() {
        return this._encouragements[Math.floor(Math.random() * this._encouragements.length)]
    }

    public updateEncourageMessage() {

        // Create as needed
        if (!this._statusBarItem) {
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }

        // Get the current text editor
        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }

        this._statusBarItem.text = this.getRandomEncouragement();
        this._statusBarItem.show();
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}