import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { fetchArticles } from '../../actions/articleActions';
import SearchPage from '../../pages/search';

const mapStateToProps = (state) => {
    return {
        articles: Object.values(state.entities.articles.all),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchArticles: () => dispatch(fetchArticles()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);