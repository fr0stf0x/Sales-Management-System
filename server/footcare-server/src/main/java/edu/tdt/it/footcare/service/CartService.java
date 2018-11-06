package edu.tdt.it.footcare.service;

import edu.tdt.it.footcare.config.security.authentication.user.UserPrincipal;
import edu.tdt.it.footcare.domain.cart.Cart;
import edu.tdt.it.footcare.domain.cart.CartRepository;
import edu.tdt.it.footcare.domain.product.version.ProductVersion;
import edu.tdt.it.footcare.domain.product.wrapper.ProductInSelling;
import edu.tdt.it.footcare.payload.transaction.AddToCartRequest;
import edu.tdt.it.footcare.payload.transaction.CartResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private CartRepository cartRepository;
    private ProductVersionService productVersionService;
    private ProductWrapperService productWrapperService;

    @Autowired
    public void setProductWrapperService(ProductWrapperService productWrapperService) {
        this.productWrapperService = productWrapperService;
    }

    @Autowired
    public void setProductVersionService(ProductVersionService productVersionService) {
        this.productVersionService = productVersionService;
    }

    @Autowired
    public void setCartRepository(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart getCart(UserPrincipal userPrincipal) {
        return cartRepository.existsByCreatedBy(userPrincipal.getId()) ?
                cartRepository.findByCreatedBy(userPrincipal.getId()) :
                cartRepository.save(new Cart());
    }

    public void clearCart(Cart cart) {
        cart.clear();
        save(cart);
    }

    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    public Cart addProduct(UserPrincipal userPrincipal, AddToCartRequest request) {
        Cart cart = getCart(userPrincipal);
        if (cart.contains(request.getProductVersionId(), request.getSize())) {
            cart.modifyQuantity(request.getProductVersionId(), request.getSize(), request.getCount());
        } else {
            ProductVersion productVersion = productVersionService.findByVersionId(request.getProductVersionId());
            ProductInSelling product = new ProductInSelling();
            product.setProductVersion(productVersion);
            product.setCount(request.getCount());
            product.setSize(request.getSize());
            cart.getProducts().add(product);
        }
        return save(cart);
    }

    public CartResponse createCartResponse(Cart cart) {
        CartResponse cartResponse = new CartResponse();
        cartResponse.setProducts(productWrapperService.mapWrapperToResponse(cart.getProducts()));
        cartResponse.setTotalMoney(productWrapperService.calculateTotalMoney(cart.getProducts()));
        return cartResponse;
    }
}