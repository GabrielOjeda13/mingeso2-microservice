package com.mingeso.msorders.services;


import com.mingeso.msorders.entities.OrderEntity;
import com.mingeso.msorders.entities.OrderReparacionEntity;
import com.mingeso.msorders.repositories.OrderReparacionRepository;
import com.mingeso.msorders.repositories.OrderRepository;
import com.mingeso.msorders.requests.CreateOrderRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class OrderService {

    OrderRepository orderRepository;
    OrderReparacionRepository orderReparacionRepository;

    @Autowired
    public ArrayList<OrderEntity> getOrden(){ return (ArrayList<ORderEntity>) costoRepository.findAll(); }

    public CostoEntity saveOrden(OrderEntity order){ return costoRepository.save(order); }

    public OrderEntity getOrdenById(Long id){
        return costoRepository.findById(id).get();
    }

    public OrderEntity updateOrder(OrderEntity order) { return orderRepository.save(order);}
    """
    @Transactional
    public void createOrder(CreateOrderRequest createOrderRequest) {
        DecreaseStockRequest decreaseStockRequest = new DecreaseStockRequest();
        decreaseStockRequest.setProducts(createOrderRequest.getProducts());
        this.productsFeignClient.decreaseStock(decreaseStockRequest);

        Order order = new Order();
        order.setDescription(createOrderRequest.getDescription());
        order.setPaymentMethod(createOrderRequest.getPaymentMethod());
        order.setTotal(createOrderRequest.getTotal());
        order = this.orderRepository.save(order);

        //Podría verificar previamente que los productos existan

        ArrayList<OrderProduct> orderProducts = new ArrayList<>();
        for (RequestProduct product : createOrderRequest.getProducts()) {
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setOrderId(order.getId());
            orderProduct.setProductId(product.getId());
            orderProduct.setQuantity(product.getQuantity());
            orderProducts.add(orderProduct);
        }

        this.orderProductRepository.saveAll(orderProducts);
    }
    """

}
