import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faUnderline, faStrikethrough,
        faIndent, faOutdent, faSubscript, faSuperscript,
        faUndo, faRedo, faListOl, faListUl, faParagraph, faLink } from '@fortawesome/free-solid-svg-icons'


export default class extends React.Component{
  constructor() {
    super()
    this.commands = [
      {command: 'bold', icon: faBold },
      {command: 'italic', icon: faItalic },
      {command: 'underline', icon: faUnderline },
      {command: 'strikeThrough', icon: faStrikethrough },
      {command: 'indent', icon: faIndent },
      {command: 'outdent', icon: faOutdent },
      {command: 'subscript', icon: faSubscript },
      {command: 'superscript', icon: faSuperscript },
      {command: 'undo', icon: faUndo },
      {command: 'redo', icon: faRedo },
      {command: 'insertOrderedList', icon: faListOl },
      {command: 'insertUnorderedList', icon: faListUl },
      {command: 'insertParagraph', icon: faParagraph }
    ]
    this.execCmd = this.execCmd.bind(this)
  }

  execCmd = (command, arg=null) => {
    document.execCommand(command, false, arg)
  }
  componentDidMount(){
    document.getElementById('contentArea').innerHTML = this.props.contentArea
  }

  render(){
    const disable = this.props.contentArea === '' ? '--disabled' : '';
    const disabled = (this.props.contentArea === '');
    return(
      <div className='container'>
        <div>
          {this.commands.map(({command, icon}, i) => <a id='command' key={i} className='btn commands' onClick={()=>this.execCmd(command, null)}>
          <FontAwesomeIcon icon={icon}/></a>)}
          <span id='horizontalRule' className='commands' onClick={()=>this.execCmd('insertHorizontalRule',null)}>HR</span>
          <span id='createLink' className='commands' onClick={()=>this.execCmd("createLink", prompt("Enter a URL", "https://"))}>
          <FontAwesomeIcon icon={faLink} />
          </span>
        </div>
        <div className='row'>
        <div required className='col-9' contentEditable={true}
        onInput={this.props.handleArticleBody}
        id='contentArea'
        ></div>
        <div className='col'>
          <button disabled={disabled} className={`basic-button${disable}`} id='post' type='submit'>Post</button>
        </div>
        </div>
      </div>
    )
  }
}
