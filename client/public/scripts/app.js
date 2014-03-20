(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
module.exports = {

    initialize: function() {
        var Router = require('router');
        this.router = new Router();
        Backbone.history.start();
    }
};
});

;require.register("collections/receipts", function(exports, require, module) {
Receipt = require('../models/receipt');
module.exports = Receipts = Backbone.Collection.extend({
    model: Receipt,
    url: 'receipts'
})

});

;require.register("collections/transactions", function(exports, require, module) {
Transaction = require('../models/transaction');
module.exports = Transactions = Backbone.Collection.extend({
    model: Transaction,
    url: 'transactions'
});
});

;require.register("initialize", function(exports, require, module) {
// The function called from index.html
$(document).ready(function() {
    var app = require('application');
    app.initialize()
});

});

;require.register("models/receipt", function(exports, require, module) {
module.exports = Receipt = Backbone.Model.extend({

})
});

;require.register("models/transaction", function(exports, require, module) {
module.exports = Transaction = Backbone.Model.extend({

});
});

;require.register("router", function(exports, require, module) {
var AppView = require('views/app_view');
var TransactionCollection = require('collections/transactions');

var transactions = new TransactionCollection();

module.exports = Router = Backbone.Router.extend({

    routes: {
        '': 'main'
    },

    main: function() {
        var mainView = new AppView({
            collection: transactions
        });
        mainView.render();
    }
});
});

;require.register("templates/home", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="large-offset-2 large-8 small-offset-1 small-10"><h1>Transactions Tracker</h1><p>This application will help you manage your transactions!</p><small data-tooltip="data-tooltip" title="Test: if it\'s pretty, it\'s working" class="has-tip">FoundationJS test</small><form data-abide="data-abide"><div id="step1"><h2>Etape 1</h2><p>Choisissez les preuves d\'achat à attacher</p><label>Catégorie<select name="proof_source"><option value="intermarche">Intermarché</option></select></label></div><div id="step2"><h2>Etape 2</h2><p>Editez les informations collectées</p><div class="title"><label>Titre:</label><input type="text" name="title" required="required"/></div><a id="trace" class="button">Attacher une preuve d\'achat</a><div class="category row collapse"><div class="large-4 columns"><label>Catégorie<select name="cat"><option value="bricolage">Bricolage</option><option value="starbuck">Starbuck</option><option value="hotdog">Hot Dog</option><option value="apollo">Apollo</option></select></label></div><div class="large-4 columns"><label>Sous-catégorie<select name="subcat"><option value="pelle">Pelle</option><option value="husker">Husker</option><option value="starbuck">Starbuck</option><option value="hotdog">Hot Dog</option></select></label></div><div class="large-4 columns"><label>Sous-sous-catégorie<select name="subsubcat"><option value="pelleapicoucontondants">Pelle à picous contondants</option><option value="husker">Husker</option><option value="apollo">Apollo</option><option value="starbuck">Starbuck</option></select></label></div></div><div class="barcode"><label>Code barre:</label><input type="text" name="barcode" required pattern="number"/></div><div class="comment"><label>Comment: (optionel)</label><textarea type="text" name="comment"></textarea></div><div class="url"><label>Url:</label><input type="text" name="url" pattern="url"/></div><div class="trace"></div><input id="add-transaction" type="submit" value="Add a new transaction" class="button success"/></div></form><local></local><table><thead><tr><th>Title</th><th>Categories</th><th>Barcode</th><th>URL</th><th>Traces</th><th width="100%">Comments</th><th width="150">Action</th></tr></thead><tbody></tbody></table><div id="receipts"><p>hello receipts div</p></div></div>');
}
return buf.join("");
};
});

;require.register("templates/transaction", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<td><a href="transaction#show/tobeimplemented">');
var __val__ = transaction.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td><td><span>');
var __val__ = transaction.category[0]
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span><br/><span>');
var __val__ = transaction.category[1]
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span><br/><span>');
var __val__ = transaction.category[2]
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span><br/></td><td><span>');
var __val__ = transaction.barcode
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span></td><td><span>');
var __val__ = transaction.url
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span></td><td><span>');
var __val__ = transaction.trace_ids
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span></td><td><span>');
var __val__ = transaction.comment
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span></td><td><a class="delete">delete<i class="fa fa-caret-down"></i></a></td>');
}
return buf.join("");
};
});

;require.register("views/app_view", function(exports, require, module) {
var TransactionView = require('./transaction');

module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/home'),
    events: {
        "click #add-transaction": "createTransaction"
    },

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        this.listenTo(this.collection, "add", this.onTransactionAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        // fetch the transactions from the database
        this.collection.fetch();
    },

    createTransaction: function(event) {
        // submit button reload the page, we don't want that
        event.preventDefault();

        // add it to the collection
        this.collection.create({
            title: this.$el.find('input[name="title"]').val(),
            comment: this.$el.find('input[name="comment"]').val(),
            trace: "to be linked",
            category: [
                this.$el.find('select[name="cat"]').val(),
                this.$el.find('select[name="subcat"]').val(),
                this.$el.find('select[name="subsubcat"]').val()
            ],
            barcode: this.$el.find('input[name="barcode"]').val(),
            url: this.$el.find('input[name="url"]').val()

        });
    },

    onTransactionAdded: function(transaction) {
        // render the specific element
        transactionView = new TransactionView({
            model: transaction
        });
        transactionView.render();
        this.$el.find('tbody').append(transactionView.$el);
    }
});
});

;require.register("views/transaction", function(exports, require, module) {
module.exports = Transaction = Backbone.View.extend({

    tagName: 'tr',
    template: require('../templates/transaction'),
    events: {
        'click a.delete': 'deleteTransaction'
    },

    render: function() {
        this.$el.html(this.template({
            transaction: this.model.toJSON()
        }));
    },

    deleteTransaction: function() {
        this.model.destroy();
        this.remove();
    }
});
});

;
//# sourceMappingURL=app.js.map