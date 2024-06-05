package com.mingeso.msreparaciones.services;

import com.mingeso.msreparaciones.entities.ReparacionEntity;
import com.mingeso.msreparaciones.repositories.ReparacionRepository;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Service
public class ReparacionService {
    @Autowired
    ReparacionRepository reparacionRepository;

    public ArrayList<ReparacionEntity> getReparaciones(){ return (ArrayList<ReparacionEntity>) reparacionRepository.findAll(); }

    public ArrayList<ReparacionEntity> getReparacionesPatente(String patente){ return (ArrayList<ReparacionEntity>) reparacionRepository.findByreparacionPatente(patente); }

    public ReparacionEntity saveReparacion(ReparacionEntity reparacion){ return reparacionRepository.save(reparacion); }

    public ReparacionEntity getReparacionById(Long id){
        return reparacionRepository.findById(id).get();
    }

    public ReparacionEntity updateReparacion(ReparacionEntity reparacion) { return reparacionRepository.save(reparacion);}

    public List<Object[]> obtenerReporteReparaciones() {
        return reparacionRepository.obtenerReporteReparaciones();
    }

    public List<Object[]> obtenerReporteReparacionesTipoMotor() {
        return reparacionRepository.obtenerReporteReparacionesTipoMotor();
    }
    """
    @Transactional
    public void decreaseStock(DecreaseStockRequest decreaseStockRequest) {

        ArrayList<Product> productsToUpdate = new ArrayList<>();
        for(RequestProduct requestProduct : decreaseStockRequest.getProducts()) {
            Optional<Product> optionalProduct = this.productRepository.findById(requestProduct.getId());
            if(optionalProduct.isEmpty()) throw new BadRequestException("un producto no existe...");
            Product product = optionalProduct.get();

            product.setStock(product.getStock() - requestProduct.getQuantity());
            productsToUpdate.add(product);
        }
        this.productRepository.saveAll(productsToUpdate);
    }
    """
}
