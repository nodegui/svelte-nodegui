import ElementNode from './ElementNode'
import { addTaggedAdditionalCSS, removeTaggedAdditionalCSS } from 'tns-core-modules/ui/styling/style-scope'
import { topmost, Frame } from 'tns-core-modules/ui/frame'

class StyleSheet {

    _rules: string[] = [];

    deleteRule(index: number) {
        let removed = this._rules.splice(index, 1);
        for (let r in removed) {
            console.log("removing transition rule", r);
            //TODO: remove it from the _css on stylescope and from _keyframes[name]
        }
    }

    insertRule(rule: string, index: number = 0) {
        console.log("Adding transition rule", rule);
        let frame = topmost();
        frame.addCss(rule);
        this._rules.splice(index, 0, rule);
    }

    get cssRules(): any {
        return this._rules;
    }
}

export default class StyleNode extends ElementNode {

    _sheet: StyleSheet;

    constructor(text: string) {
        super('style')
        this._sheet = new StyleSheet();
    }

    get sheet(): StyleSheet {
        return this._sheet;
    }

}
