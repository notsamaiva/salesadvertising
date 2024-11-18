import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import PriceCard from './PriceCard'; 
import AddOnCard from './AddOnCard'; 
import Flypro from './Flypro'; 
import Flypremuim from './Flypremuim'; 
import Full from './Full'; 
import Video from './Video'; 

const PriceList = () => {
  const { country } = useParams(); 
  const navigate = useNavigate();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('1month');
  const [selectedPack, setSelectedPack] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]); // Changed to an array
  const [link, setLink] = useState('');
  useEffect(() => {
    //setLink(window.location.href);
    setLink(window.location.pathname + window.location.search);


    const fetchPrices = async () => {
      try {
        const response = await axios.get(`http://localhost/pricing_app/get_prices.php?country=${country}`);
        if (response.data.success) {
          setPrices(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Une erreur s\'est produite lors de la récupération des prix.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [country]);

  const handleToggle = () => {
    setPeriod(prevPeriod => (prevPeriod === '1month' ? '3months' : '1month'));
  };

  const filteredPrices = prices.filter(price => price.period === period);

  // Update this function to handle multiple selected add-ons
  const handleAddOnToggle = (addOn) => {
    setSelectedAddOns(prevAddOns => 
      prevAddOns.includes(addOn) 
        ? prevAddOns.filter(item => item !== addOn) 
        : [...prevAddOns, addOn]
    );
  };

  const handleRedirect = () => {
    let addOn1 = null, addOn2 = null, addOn3 = null;
    let addOnPrice1 = 0, addOnPrice2 = 0, addOnPrice3 = 0;
  
    if (selectedAddOns.length > 0) {
      const selectedPriceItem = filteredPrices.find(item => {
        return selectedAddOns.some(addOn => 
          (addOn === "Standard display" && item.standard) ||
          (addOn === "Full screen display" && item.interstitial) ||
          (addOn === "Video ads" && item.videoads)
        );
      });
  
      if (selectedPriceItem) {
        selectedAddOns.forEach((addOn, index) => {
          if (index === 0) {
            addOn1 = addOn;
            addOnPrice1 = addOn === "Standard display" ? selectedPriceItem.standard
                          : addOn === "Full screen display" ? selectedPriceItem.interstitial
                          : addOn === "Video ads" ? selectedPriceItem.videoads
                          : 0;
          } else if (index === 1) {
            addOn2 = addOn;
            addOnPrice2 = addOn === "Standard display" ? selectedPriceItem.standard
                          : addOn === "Full screen display" ? selectedPriceItem.interstitial
                          : addOn === "Video ads" ? selectedPriceItem.videoads
                          : 0;
          } else if (index === 2) {
            addOn3 = addOn;
            addOnPrice3 = addOn === "Standard display" ? selectedPriceItem.standard
                          : addOn === "Full screen display" ? selectedPriceItem.interstitial
                          : addOn === "Video ads" ? selectedPriceItem.videoads
                          : 0;
          }
        });
      }
    }
  
    if (selectedPack && selectedPrice !== null && selectedCurrency) {
      navigate(`/details/${country}/${selectedPack}/${period}`, {
        state: {
          pack: selectedPack,
          price: selectedPrice,
          currency: selectedCurrency,
          addOn1: addOn1,            // Pass the first selected add-on
          addOn2: addOn2,            // Pass the second selected add-on (if any)
          addOn3: addOn3,            // Pass the third selected add-on (if any)
          addOnPrice1: addOnPrice1,  // Pass the price for the first add-on
          addOnPrice2: addOnPrice2,  // Pass the price for the second add-on (if any)
          addOnPrice3: addOnPrice3,  // Pass the price for the third add-on (if any)
          period: period,
          country: country,
          link: link,  
        },
      });
    }
  };
  

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh', marginTop: 13 }}>
       <Typography variant="body1" gutterBottom sx={{ textAlign: 'center', marginBottom: 2 }}>
       URL Price : {link}
       </Typography>

      
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        <strong>{country}</strong> Price list for directly sold advertising spaces on FlyPool apps 
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>
      ) : filteredPrices.length === 0 ? (
        <Typography sx={{ textAlign: 'center' }}>Aucun prix disponible pour ce pays.</Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 3 }}>
            <Typography variant="body1" sx={{ marginRight: 4, color: '#66bebf' }}>1 month</Typography>
            <Button
              onClick={handleToggle}
              sx={{
                backgroundColor: period === '1month' ? '#66bebf' : '#13017c',
                borderRadius: '25px',
                position: 'relative',
                width: '100px',
                height: '45px',
                padding: 0,
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: period === '1month' ? '#66bebf' : '#13017c',
                }
              }}
            >
              <Box sx={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: period === '1month' ? '25%' : '75%',
                transform: 'translate(-50%, -50%)',
                transition: 'left 0.3s ease',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              }} />
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ marginLeft: 4, color: '#13017c' }}>3 months</Typography>
              <Typography
                variant="body2"
                sx={{
                  marginLeft: 1,
                  color: '#66bebf',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  position: 'relative',
                  top: '-5px',
                }}
              >
                <span style={{ fontSize: '0.7rem', verticalAlign: 'super' }}>30%</span> of Discount
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, marginLeft: 'auto', marginRight: 'auto', maxWidth: '80%', marginTop: 10 }}>
            {filteredPrices.map(item => (
              <React.Fragment key={item.id}>
                <PriceCard 
                  title="FLYSTARTER" 
                  price={item.starter_price} 
                  currency={item.currency} 
                  period={period} 
                  selectedPack={selectedPack} 
                  setSelectedPack={setSelectedPack} 
                  setSelectedPrice={setSelectedPrice} 
                  setSelectedCurrency={setSelectedCurrency} 
                />
                <Flypro 
                  title="FLYPRO" 
                  price={item.promo_price} 
                  currency={item.currency} 
                  period={period} 
                  selectedPack={selectedPack} 
                  setSelectedPack={setSelectedPack} 
                  setSelectedPrice={setSelectedPrice} 
                  setSelectedCurrency={setSelectedCurrency} 
                />
                <Flypremuim 
                  title="FLYPREMIUM" 
                  price={item.premium_price} 
                  currency={item.currency} 
                  period={period} 
                  selectedPack={selectedPack} 
                  setSelectedPack={setSelectedPack} 
                  setSelectedPrice={setSelectedPrice} 
                  setSelectedCurrency={setSelectedCurrency} 
                />
              </React.Fragment>
            ))}
          </Box>

          {selectedPack && (
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#13017c' }}>
                <strong>{country}</strong> Additional services
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                Designing ad creative in house
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, marginLeft: 'auto', marginRight: 'auto', marginTop: '50px', maxWidth: '80%' }}>
                {filteredPrices.map(item => (
                  <React.Fragment key={item.id}>
                    {item.standard !== undefined && (
                      <AddOnCard 
                        title="Standard display" 
                        price={item.standard} 
                        currency={item.currency} 
                        selectedAddOn={selectedAddOns} // Pass array of selected add-ons
                        setSelectedAddOn={handleAddOnToggle} // Handle toggle for multiple selections
                        isSelected={selectedAddOns.includes("Standard display")} // Check if selected
                      />
                    )}
                    {item.interstitial !== undefined && (
                      <AddOnCard 
                        title="Full screen display" 
                        price={item.interstitial} 
                        currency={item.currency} 
                        selectedAddOn={selectedAddOns} // Pass array of selected add-ons
                        setSelectedAddOn={handleAddOnToggle} // Handle toggle for multiple selections
                        isSelected={selectedAddOns.includes("Full screen display")} // Check if selected
                      />
                    )}
                    {item.videoads !== undefined && (
                      <AddOnCard 
                        title="Video ads" 
                        price={item.videoads} 
                        currency={item.currency} 
                        selectedAddOn={selectedAddOns} // Pass array of selected add-ons
                        setSelectedAddOn={handleAddOnToggle} // Handle toggle for multiple selections
                        isSelected={selectedAddOns.includes("Video ads")} // Check if selected
                      />
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
         
      <Button
        variant="contained"
        onClick={handleRedirect}
        sx={{
          backgroundColor: '#13017c',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#66bebf',
          },
        }}
      >
        NEXT STEP
      </Button>

          </Box>
        </>
      )}
    </Box>
  );
};

export default PriceList;
