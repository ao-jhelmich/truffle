App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;

      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access
        console.warning("User denied account access");
      }
    } else if (window.web3) { // Legacy dapp browsers
      App.web3Provider = window.web3.currentProvider;
    } else { // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    web3 = new Web3(App.web3Provider)

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Flip.json', function (data) {
      var FlipArtifact = data;
      App.contracts.Flip = TruffleContract(FlipArtifact);
      App.contracts.Flip.setProvider(App.web3Provider)
      return App.getFlipped()
    })

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#flipIt', App.flipValue);
  },

  flipValue: function(event) {
    event.preventDefault();

    var flipInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.error(error);
      }

      var account = accounts[0]; 

      App.contracts.Flip.deployed().then(function (instance) {
        flipInstance = instance;

        return flipInstance.flip({from: account});
      }).then(function(value) {
        App.getFlipped()
      }).catch(function (err) {
        console.error(err.message)
      })
    })
  },

  getFlipped: function() {
    var flipInstance;

    App.contracts.Flip.deployed().then(function (instance) {
      flipInstance = instance;

      return flipInstance.get.call();
    }).then(function(value) {
      text = value ? 'True' : 'False'

      $('#flipValue').text(text)
    }).catch(function (err) {
      console.error(err.message)
    })
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
