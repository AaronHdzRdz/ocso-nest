"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var provider_entity_1 = require("../../../../../../../../../../../../src/providers/entities/provider.entity");
var typeorm_1 = require("typeorm");
var Product = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _productId_decorators;
    var _productId_initializers = [];
    var _productId_extraInitializers = [];
    var _productName_decorators;
    var _productName_initializers = [];
    var _productName_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _countSeal_decorators;
    var _countSeal_initializers = [];
    var _countSeal_extraInitializers = [];
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    var Product = _classThis = /** @class */ (function () {
        function Product_1() {
            this.productId = __runInitializers(this, _productId_initializers, void 0);
            this.productName = (__runInitializers(this, _productId_extraInitializers), __runInitializers(this, _productName_initializers, void 0));
            this.price = (__runInitializers(this, _productName_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            this.countSeal = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _countSeal_initializers, void 0));
            this.provider = (__runInitializers(this, _countSeal_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
            __runInitializers(this, _provider_extraInitializers);
        }
        return Product_1;
    }());
    __setFunctionName(_classThis, "Product");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _productId_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)("uuid")];
        _productName_decorators = [(0, typeorm_1.Column)({ type: "text" })];
        _price_decorators = [(0, typeorm_1.Column)({ type: "float" })];
        _countSeal_decorators = [(0, typeorm_1.Column)({ type: "int" })];
        _provider_decorators = [(0, typeorm_1.ManyToOne)(function () { return provider_entity_1.Provider; }, function (provider) { return provider.products; }, {
            /* eager: true, */
            }), (0, typeorm_1.JoinColumn)({
                name: 'providerId',
            })];
        __esDecorate(null, null, _productId_decorators, { kind: "field", name: "productId", static: false, private: false, access: { has: function (obj) { return "productId" in obj; }, get: function (obj) { return obj.productId; }, set: function (obj, value) { obj.productId = value; } }, metadata: _metadata }, _productId_initializers, _productId_extraInitializers);
        __esDecorate(null, null, _productName_decorators, { kind: "field", name: "productName", static: false, private: false, access: { has: function (obj) { return "productName" in obj; }, get: function (obj) { return obj.productName; }, set: function (obj, value) { obj.productName = value; } }, metadata: _metadata }, _productName_initializers, _productName_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _countSeal_decorators, { kind: "field", name: "countSeal", static: false, private: false, access: { has: function (obj) { return "countSeal" in obj; }, get: function (obj) { return obj.countSeal; }, set: function (obj, value) { obj.countSeal = value; } }, metadata: _metadata }, _countSeal_initializers, _countSeal_extraInitializers);
        __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Product = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Product = _classThis;
}();
exports.Product = Product;
