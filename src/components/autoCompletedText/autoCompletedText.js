import React from 'react';
import countries from '../../utils/countries';
import '../../assets/sass/global.scss';

export default class AutoCompletedText extends React.Component {

    // The constructor
    constructor(props) {
        // We have to initialize the parent (React.Component)
        // with the same props
        super(props);
        // And after that, configure the initial state
        this.state = {
            suggestions: [],
            text: ''
        };

        this.onTextChange = this.onTextChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.selectedText = this.selectedText.bind(this);
    }

    getSuggestionsArray = (val) => {
        // In this array we store the valid suggestions
        let suggestions = [];
        // We only have to search if the val length is greater than 0!
        if (val.length > 0) {
            // Using a Regex filter we can get from the countries list
            // Just the countries starting with the value searched
            const regex = new RegExp(`^${val}`, 'i');
            suggestions = countries.sort().filter(v => regex.test(v))
        }
        return suggestions;
    }

    // Now we have to setup the function that control the events of the component
    // First the one to manage when the text changes in the search field
    onTextChange = (e) => {
        // We have to get the value from the input
        const value = e.target.value;

        let suggestions = this.getSuggestionsArray(value);

        // After we get the right suggestions array, we update the state with it
        // So the UI is updated!
        this.setState(() => ({
            suggestions,
            text: value
        }));
    }

    // This function runs when we lost focus on the input component
    // To hide the suggestions list
    onBlur = (e) => {
        // This condition checks if we really lost focus or if we
        // just focused in a child of this component
        if (!e.currentTarget.contains(e.relatedTarget)) {
            // Just if we really lost the focus, we hide the suggestions list
            this.setState(() => ({
                suggestions: []
            }));
        }
    }

    // This functions runs when we get the focus on the input component
    // To display the current input value's suggestion list
    // (Only if there is something written in the input)
    onFocus = (e) => {
        // We have to get the value from the input
        const value =  e.target.value;

        let suggestions = this.getSuggestionsArray(value);

        // After we get the right suggestions array, we update the state with it
        // So the UI is updated!
        this.setState(() => ({
            suggestions,
            text: value
        }));
    }

    // This other function will manage when we select a item (country in this case)
    // from our suggestions
    selectedText(value) {
        // In that case we update the state with the selection
        // And clean the suggestions array so the suggestions list dissapear!
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    // This function is used to render the suggestions list
    renderSuggestions = () => {
        // We have to get the suggestions array from the component's state
        let { suggestions } = this.state;
        if (suggestions.length === 0) {
            // If there is no suggestions, we don't need to render this component!
            return null;
        }
        return (
            <div className="suggestionsBox">
                <ul >
                    {
                        //  We use the map function to format each item of the array
                        // Don't forget to add a key attrb since React needs it!
                        suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{item}<span></span><span></span><span></span><span></span></li>))
                    }
                </ul>
            </div>
        );
    }

    // This is the render function every React component needs!
    render() {
        // First we save the vars we use from our state so we can work with them easily
        const text = this.state.text;
        // And now we render the component
        return (
            <div id="searchbox-wrapper">
                <div id="searchbox">
                    <h2>Which country would you like to visit?</h2>
                    {/* Remember: we register the onTextChange function to work with the component's onChange event! */}
                    <div className="input-wrapper">
                        <input id="query" type="text" onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onTextChange} value={text} placeholder="Start writing a country..." autoComplete="off" />
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                    {/* Now we render the suggestions (if not null) */}
                    {this.renderSuggestions()}
                    {/* <span>Suggestions: {suggestions.length}</span> */}
                </div>
            </div>
        );
    }

}