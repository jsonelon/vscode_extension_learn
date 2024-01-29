// 'vscode' 模块包含了 VS Code 的扩展 API
// 导入该模块并使用别名 vscode 在下面的代码中引用
import * as vscode from 'vscode';

// 获取用户输入参数
// const userValue = await vscode.window.showInputBox({ prompt: 'Enter a number' });

// 弹出信息框
// vscode.window.showInformationMessage('预测输入');

// 当你的扩展被激活时，该方法会被调用
// 扩展在第一次执行命令时被激活
export function activate(context: vscode.ExtensionContext) {
	// 获取选取的文本,并且把数字加1
	let command1 = vscode.commands.registerCommand('my.command1', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit((editBuilder) => {
				editor.selections.forEach((selection) => {
					const selectedText = editor.document.getText(selection);
					const incrementedText = incrementNumbers(selectedText);
					editBuilder.replace(selection, incrementedText);
				});
			});
		}
	});

	let command2 = vscode.commands.registerCommand('my.command2', async () => {
		const userValue = await vscode.window.showInputBox({ prompt: 'Enter a number' });
		vscode.window.showInformationMessage(userValue || '没有输入');
	});

	let command3 = vscode.commands.registerCommand('my.command3', () => {
		vscode.window.showInformationMessage("Hello World!");
	});


	context.subscriptions.push(command1, command2, command3);

}


function incrementNumbers(text: string) {
	// 使用正则表达式匹配数字，并将其自增
	return text.replace(/\b(\d+)\b/g, (_, match) => {
		const number = parseInt(match, 10);
		return (number + 1).toString();
	});
}

// 当你的扩展被停用时，该方法会被调用
export function deactivate() { }
