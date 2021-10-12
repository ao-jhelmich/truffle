
pragma solidity ^0.8.9;

contract ProductContract {
    struct Product {
        string name;
        string location;
    }
    
    mapping (string => Product) products;
    string[] public productDb;
    
    function setProduct(string memory _hash, string memory _name, string memory _location) public {
        struct ProductContract.Product storage pointer product = products[_hash];
        
        product.name = _name;
        product.location = _location;
        
        productDb.push(_hash)-1;
    }
    
    function getProducts() view public returns(string[] memory) {
        return productDb;
    }
    
    function getProduct(string memory _hash) view public returns (string memory, string memory) {
        var product = products[_hash];

        return (product.name, product.location);
    }
    
    function countProducts() view public returns (uint) {
        return productDb.length;
    }
}
