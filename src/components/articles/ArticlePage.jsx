import React, { Component } from 'react';
import Tags from './Tags'
import { editArticle } from "../../redux/actions/ArticleActionCreators";
import { doNothing } from '../../redux/actions/commonActions'

const DateDisplay = (dateString) => new Date(dateString).toDateString()

class Article extends Component {

    componentDidMount(){
        document.getElementById('data').innerHTML = this.props.article.body
    }

render() { 
    const { article, onClickHandler} = this.props;
    const username = article.author.username
return (
    <div className="container singleArticle">
        <div className="row">
            <div className="col-lg-8">
            <h1>{article.title}</h1>
                <div className="row">
                <div class="col-md-1.5 img">
                <img className='rounded-circle' src={article.author.image || "http://placehold.it/300x300"}/>
                    <blockquote>
                    <h6>{article.author.username}</h6>
                    <i>{DateDisplay(article.created_on)}</i>
                    <h6>{article.read_time}</h6>
                    </blockquote>
            
                </div>

                <div className='col-3' hidden={username !== localStorage.getItem('username')}>
                <button id='edit' className={'btn btn-primary'}
                onClick={onClickHandler(article.slug, null, editArticle, 'put')} value={'Edit'}>Edit</button>
                <button id="del" className={'btn btn-primary'} 
                onClick={onClickHandler(article.slug, null, doNothing, 'delete')} value={'Delete'}>Delete</button>
                </div>
                </div>
                <hr/>
                <img src={article.image_url || "http://placehold.it/700x300"} className="img-responsive" />
                <hr />
                <p className="lead">{article.description}</p>
                <div id='data' className='panel'>
                </div>
                <br/>
                <br/>
                <Tags tags={article.tags} />
                <br/>
                <hr />
                <div className="well">
                    <h4><i className="fa fa-paper-plane-o"></i> Leave a Comment:</h4>
                    <form role="form">
                        <div className="form-group">
                            <textarea className="form-control" rows="3"></textarea>
                        </div>
                        <button className='btn btn-primary' type="submit">Comment</button>
                    </form>
                </div>
                <hr/>
                <div>
                <h3><i className="fa fa-comment">User One says:</i> 
                    <small> 9:41 PM on August 24, 2014</small>
                </h3>
                <p>Excellent post! Thank You the great article, it was useful!</p>

                <h3><i className="fa fa-comment">User Two says:</i> 
                    <small> 9:47 PM on August 24, 2014</small>
                </h3>
                <p>Excellent post! Thank You the great article, it was useful!</p>

            </div></div></div></div>
    );
}
}

export default Article;
