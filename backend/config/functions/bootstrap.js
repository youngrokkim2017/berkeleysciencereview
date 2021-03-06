'use strict';

// /**
//  * An asynchronous bootstrap function that runs before
//  * your application gets started.
//  *
//  * This gives you an opportunity to set up your data model,
//  * run jobs, or perform some special logic.
//  *
//  * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#bootstrap
//  */

// const path = require('path');
// const mime = require('mime');

module.exports = () => {

    //     var data = require('fs').readFileSync('data/articles.js', 'utf8');
    //     var data = JSON.parse(data);

    //     var authors = require('fs').readFileSync('data/authors.js', 'utf8');
    //     var authors = JSON.parse(authors);

    //     var cats = require('fs').readFileSync('data/categories.js', 'utf8');
    //     var cats = JSON.parse(cats);

    //     var issues = require('fs').readFileSync('data/issues.js', 'utf8');
    //     var issues = JSON.parse(issues);

    //     async function create(data, files = {}) {
    //         if (data.primary_category === null && data.secondary_category === null) {
    //             var categories = []
    //         }
    //         else if (data.primary_category !== null && data.secondary_category === null) {
    //             var primary_category = await strapi.query('category').findOne({ title: data.primary_category });
    //             var categories = [primary_category.id]
    //         }
    //         else if (data.primary_category !== null && data.secondary_category !== null) {
    //             var primary_category = await strapi.query('category').findOne({ title: data.primary_category });
    //             var secondary_category = await strapi.query('category').findOne({ title: data.secondary_category });
    //             var categories = [primary_category.id, secondary_category.id]
    //         }

    //         if (data.author === null) {
    //             var author = null
    //         }
    //         else {
    //             var author = await strapi.query('authors').findOne({ name: data.author });
    //         }

    //         if (data.issue === null) {
    //             var magazine = null
    //         }
    //         else {
    //             var magazine = await strapi.query('magazine-issue').findOne({ title: data.issue });
    //         }

    //         var entry = await strapi.query('article').create({
    //             title: (data.title) ? data.title : null,
    //             published_at: (data.created_at) ? data.created_at : null,
    //             author: (author) ? author.id : null,
    //             categories: (categories) ? categories : null,
    //             magazine: (data.issue) ? magazine.id : null,
    //             content: (data.markdown) ? data.markdown : null
    //         });

    //         if (files) {
    //             await strapi.entityService.uploadFiles(entry, files, {
    //                 model: strapi.models.article.modelName
    //             });
    //             return this.findOne({ id: entry.id });
    //         }

    //         return entry;
    //     };

    //     var i = 0;
    //     var f = 0;
    //     var e = 0;
    //     data.forEach(article => {
    //         i += 1;
    //         try {

    //             var image_name = path.parse(article.featured_image).base;

    //             var path_to_img = 'data/images/' + image_name;
    //             var fileStat = require('fs').statSync(path_to_img);

    //             var files = {
    //                 image: {
    //                     path: path_to_img,
    //                     name: path.parse(path_to_img).base,
    //                     type: mime.getType(path_to_img),
    //                     size: fileStat.size,
    //                 }
    //             }
    //             // create(article, files);
    //             f += 1;
    //         }
    //         catch (error) {
    //             // create(article);
    //             e += 1;
    //         }
    //     });

    //     console.log(i, f, e + ' total posts for import');

    //     // authors.forEach(author => {
    //     //     strapi.query('authors').create({
    //     //      name: author.name
    //     //     })

    //     // });

    //     // cats.forEach(cat => {
    //     //     strapi.query('category').create({
    //     //      title: cat.name
    //     //     })

    //     // });

    //     // issues.forEach(issue => {
    //     // // console.log(issue.number)
    //     //     strapi.query('magazine-issue').create({
    //     //         title: issue.name,
    //     //         issue: issue.number,

    //     //     })

    //     // });


    //     async function del(type) {
    //         const data = await strapi.query(type).find({ _limit: -1 });
    //         data.forEach(i => {
    //             strapi.query(type).delete({ id: i });
    //             console.log('deleting', type, ':', i.id);
    //         })
    //     }

    //     async function del_media() {
    //         while (1) {
    //             const media = await strapi.plugins['upload'].services.upload.fetchAll();
    //             media.forEach(i => {
    //                 strapi.plugins['upload'].services.upload.remove({ id: i.id });
    //                 console.log('deleting media:', i.id);
    //             })
    //         }
    //     }

    //     try {
    //         // del('article')
    //         // del('authors')
    //         // del('category')
    //         // del('magazine-issue')
    //         // del_media()
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }


    // UPDATE AUTHORS FUNCTION

    // var data = require('fs').readFileSync('data/mongodb-articles-new.json', 'utf8');
    // var data = JSON.parse(data);

    // data.forEach(article => {
    //     try {
    //         update(article);
    //     }
    //     catch (error) {
    //         console.log("error");
    //     }
    // });

    // async function update(data) {
    //     var author = await strapi.query('authors').findOne({ id: data.author.$oid });
        
    //     var entry = await strapi.query('article').update(
    //         {id: data._id.$oid},
    //         {authors: [author._id]}
    //     );

    //     return entry;

    // };

};
