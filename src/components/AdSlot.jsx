/**
 * Placeholder ad slot.
 *
 * Once your AdSense account is approved, replace the placeholder <div> below
 * with your real ad unit, e.g.:
 *
 * <ins className="adsbygoogle"
 *      style={{ display: "block" }}
 *      data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
 *      data-ad-slot="XXXXXXXXXX"
 *      data-ad-format="auto"
 *      data-full-width-responsive="true"></ins>
 *
 * and load the AdSense script once in index.html:
 * <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
 */
function AdSlot({ label = "Advertisement", size = "banner" }) {
  return (
    <div className={`ad-slot ad-slot-${size}`}>
      <span className="ad-slot-label">{label}</span>
    </div>
  );
}

export default AdSlot;
