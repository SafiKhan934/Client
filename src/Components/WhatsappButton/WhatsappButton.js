import styles from "./WhatsappButton.module.css"
function WhatsappButton({ watch }) {
  const phoneNumber = "+923707189797"
  const handleWhatsAppClick = () => {
    const message = `Hello! I'm interested in this watch:\nName: ${watch.name}\nOriginal-Price: ${watch.price?.original}\ndiscount-price : {watch.price?.discount}\nCheck image: ${watch.image?.url}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappLink, "_blank")
  }
  console.log(watch.image?.url)
  return (
    <button onClick={handleWhatsAppClick} className={styles.whatsappBtn}>
      Contact on WhatsApp
    </button>
  )
}
export default WhatsappButton
