import ElementNode from './ElementNode'
import { addTaggedAdditionalCSS, removeTaggedAdditionalCSS } from 'tns-core-modules/ui/styling/style-scope'

class StyleSheet {

    _rules: symbol[] = [];
    _sheetId: Symbol = Symbol('StyleSheet Instance')

    deleteRule(index: number) {
        let removed = this._rules.splice(index, 1);
        for (let r in removed) {
            console.log("removing transition rule", r);
            removeTaggedAdditionalCSS(r);
        }
    }

    insertRule(rule: string, index: number = 0) {
        const rule_tag = Symbol("Style Rule")
        console.log("Adding transition rule", rule_tag, rule);
        addTaggedAdditionalCSS(rule, rule_tag);
        this._rules.splice(index, 0, rule_tag);
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
        return this.sheet;
    }

}
