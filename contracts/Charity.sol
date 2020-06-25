pragma solidity 0.5.16;

contract SimpleERC20Token {
    // Track how many tokens are owned by each address.
    mapping(address => uint256) public balanceOf;
    address public owner;

    // Modify this section
    string public name = "Charity ERC20 Token";
    string public symbol = "CTKN";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * (uint256(10)**decimals);

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor() public {
        // Initially assign all tokens to the contract's creator.
        owner = msg.sender;
        balanceOf[owner] = totalSupply;
        emit Transfer(address(0), owner, totalSupply);
    }

    function transfer(address to, uint256 value) public returns (bool success) {
        require(
            balanceOf[owner] >= value,
            "Balance of Owner is not greater than Value"
        );

        balanceOf[owner] -= value; // deduct from sender's balance
        balanceOf[to] += value; // add to recipient's balance
        emit Transfer(owner, to, value);
        return true;
    }

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    mapping(address => mapping(address => uint256)) private allowance;

    function approve(address spender, uint256 value)
        public
        returns (bool success)
    {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public returns (bool success) {
        require(value <= balanceOf[from], "Balance: No Overflow");
        require(value <= allowance[from][msg.sender], "Allowance: No Overflow");

        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}

contract SupplyChain is SimpleERC20Token {
    enum Category {
        Food,
        Clothing,
        Furniture,
        Education,
        Transportation,
        Medical,
        Funding
    }

    struct Charity {
        string charityName;
        address ID;
        string request;
        uint256 members;
        string primaryContact;
        bool urgent;
        uint256 tokenReward;
        bool selected;
        Category category;
        uint256 index;
    }

    struct Supplier {
        string supplierName;
        address ID;
        uint256 members;
        string primaryContact;
        Category category;
        uint256 index;
    }

    uint256 public expires;
    string[] public charityIndex;
    string[] private supplierIndex;
    address[] private addressIndex;

    mapping(string => string) public char2Supp;
    mapping(string => address) public supplierAddress;
    mapping(string => Charity) public Charities;
    mapping(string => Supplier) private Suppliers;
    mapping(address => Charity) private Addresses;

    event LogNewCharity(
        string charityName,
        address ID,
        string request,
        string primaryContact,
        bool urgent,
        uint256 tokenReward,
        uint256 index
    );
    event LogNewSupplier(
        string supplierName,
        address ID,
        string primaryContact,
        uint256 index
    );
    event LogDeleteCharity(
        string charityName,
        bool completedRequest,
        uint256 index
    );

    constructor() public {
        // Initially assign all tokens to the contract's creator.
        owner = msg.sender;
    }

    function isCharity(
        string memory charity //USE for address TRUE mapping for allowing authorization
    ) public view returns (bool isIndeed) {
        if (charityIndex.length == 0) return false;

        return
            keccak256(bytes(charity)) ==
            keccak256(bytes(charityIndex[Charities[charity].index]));
    }

    function isSupplier(string memory supplier)
        public
        view
        returns (bool isIndeed)
    {
        if (supplierIndex.length == 0) return false;

        return
            keccak256(bytes(supplier)) ==
            keccak256(bytes(supplierIndex[Suppliers[supplier].index]));
    }

    function isAddress(address ID) public view returns (bool isIndeed) {
        if (addressIndex.length == 0) return false;

        return ((ID) == (addressIndex[Addresses[ID].index]));
    }

    function addCharity(
        string memory charityName,
        address ID,
        string memory request,
        uint256 members,
        string memory primaryContact,
        bool urgent,
        Category category
    ) public returns (uint256 index) {
        require(!isCharity(charityName), "Will not allow duplicate Charities");
        require(!isAddress(ID), "Will not allow duplicate IDs");

        Addresses[ID].index = addressIndex.push(ID) - 1;
        Charities[charityName].ID = ID;
        Charities[charityName].members = members;
        Charities[charityName].request = request;
        Charities[charityName].primaryContact = primaryContact;
        Charities[charityName].urgent = urgent;
        if (urgent == true) {
            Charities[charityName].tokenReward = 4;
        } else {
            Charities[charityName].tokenReward = 2;
        }
        Charities[charityName].category = category;
        Charities[charityName].selected = false;
        Charities[charityName].index = charityIndex.push(charityName) - 1;
        emit LogNewCharity(
            charityName,
            ID,
            request,
            primaryContact,
            urgent,
            Charities[charityName].tokenReward,
            Charities[charityName].index
        );
        return charityIndex.length - 1;
    }

    function getCharityInfo(string memory charity)
        public
        returns (
            address ID,
            uint256 members,
            string memory primaryContact,
            string memory request,
            Category category,
            uint256 tokenReward,
            bool selected
        )
    {
        require(isCharity(charity), "Charity requested is not within list");

        if (now > expires) {
            Charities[charity].selected = false;
        }

        return (
            Charities[charity].ID,
            Charities[charity].members,
            Charities[charity].primaryContact,
            Charities[charity].request,
            Charities[charity].category,
            Charities[charity].tokenReward,
            Charities[charity].selected
        );
    }

    function categoryMatch(string memory charity)
        public
        view
        returns (Category)
    {
        return Charities[charity].category;
    }

    function addSupplier(
        string memory supplier,
        address ID,
        uint256 members,
        string memory primaryContact,
        Category category
    ) public returns (string memory charityList) {
        require(!isSupplier(supplier), "Will not allow duplicate Suppliers");
        require(!isAddress(ID), "Will not allow duplicate IDs");
        Addresses[ID].index = addressIndex.push(ID) - 1;
        Suppliers[supplier].ID = ID;
        supplierAddress[supplier] = Suppliers[supplier].ID;
        Suppliers[supplier].members = members;
        Suppliers[supplier].primaryContact = primaryContact;
        Suppliers[supplier].category = category;
        Suppliers[supplier].index = supplierIndex.push(supplier) - 1;

        string memory rString;

        for (uint256 i = 0; i < charityIndex.length; i++) {
            if (category == categoryMatch(charityIndex[i])) {
                rString = strConcat(rString, charityIndex[i]);
                rString = strConcat(rString, ",");
            }
        }

        emit LogNewSupplier(
            supplier,
            ID,
            primaryContact,
            Suppliers[supplier].index
        );
        return rString;
    }

    modifier timeCheck() {
        require(
            now <= expires,
            "Time to complete request is up. Token reward reverted!"
        );
        _;
    }

    function selectCharity(
        string memory charity,
        string memory supplier,
        address supplierID
    ) public returns (bool isSelected) {
        require(
            supplierAddress[supplier] == supplierID,
            "Contractor title does not match Address provided!"
        );
        require(
            Charities[charity].category == Suppliers[supplier].category,
            "Categories do not match appropriately"
        );
        require(
            Charities[charity].selected == false,
            "Charity has already been selected"
        );
        expires = now + 12 minutes;
        char2Supp[charity] = supplier;
        return Charities[charity].selected = true;
    }

    function deliverRequest(
        string memory charity,
        string memory supplier,
        address supplierID
    ) public timeCheck returns (bool completedRequest) {
        require(
            hashComp(char2Supp[charity], supplier) == true,
            "Charity was not selected by Contractor provided"
        );
        transfer(supplierID, Charities[charity].tokenReward);
        deleteRequest1(charity);
        deleteRequest2(charity);
        return true;
    }

    function deleteRequest1(string memory charity) internal {
        require(isCharity(charity), "Charity requested is not within list");
        uint256 rowToDelete = Addresses[Charities[charity].ID].index;
        address keyToMove = addressIndex[addressIndex.length - 1];
        addressIndex[rowToDelete] = keyToMove;
        Addresses[keyToMove].index = rowToDelete;
        addressIndex.length--;
    }

    function deleteRequest2(string memory charity) internal {
        require(isCharity(charity), "Charity requested is not within list");
        uint256 rowToDelete = Charities[charity].index;
        string memory keyToMove = charityIndex[charityIndex.length - 1];
        charityIndex[rowToDelete] = keyToMove;
        Charities[keyToMove].index = rowToDelete;
        charityIndex.length--;
        emit LogDeleteCharity(charity, true, rowToDelete);
    }

    function strConcat(string memory _a, string memory _b)
        internal
        pure
        returns (string memory)
    {
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory ab = new string(_ba.length + _bb.length);
        bytes memory bab = bytes(ab);
        uint256 k = 0;
        for (uint256 i = 0; i < _ba.length; i++) bab[k++] = _ba[i];
        for (uint256 i = 0; i < _bb.length; i++) bab[k++] = _bb[i];
        return string(bab);
    }

    function hashComp(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        if (bytes(a).length != bytes(b).length) {
            return false;
        } else {
            return keccak256(bytes(a)) == keccak256(bytes(b));
        }
    }
}
