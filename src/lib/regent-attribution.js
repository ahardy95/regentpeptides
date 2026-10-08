/*
 * SAVE THIS AS: regent-attribution.js
 *
 * Sent as .txt only because Slack blocks .js uploads. Rename the extension
 * back to .js and it is ready to use. Nothing else needs changing.
 */

/**
 * Regent Peptides — click ID capture for the Shopify cart.
 * Concept, 24 Sep 2026. Drop-in. No dependencies. No build config.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS FILE EXISTS
 * ---------------------------------------------------------------------------
 * A paid order arrived on 24 Sep and reached our server with NO click ID.
 * Meta will accept that sale and cannot credit it to the ad that produced it,
 * so the campaign reads as unprofitable while the revenue is real.
 *
 * The cause is structural, not a bug. A visitor lands on regentpeptides.com
 * with ?fbclid=... in the URL. The cart is created later, client side, through
 * the Storefront API, and nothing from that original URL goes with it. Because
 * the storefront is headless, Shopify never sees the landing page either, so
 * there is no server-side fallback to recover it from. The cart is the only
 * place this can be fixed.
 *
 * ---------------------------------------------------------------------------
 * HOW TO INSTALL, TWO STEPS
 * ---------------------------------------------------------------------------
 * 1. Call captureRegentAttribution() as early as possible on first load. In a
 *    Lovable/React app the top of App.jsx, or a useEffect in the root layout
 *    with an empty dependency array, is right. Calling it more than once is
 *    safe.
 *
 * 2. Spread regentCartAttributes() into the `attributes` array of your
 *    cartCreate input. If the cart already exists when checkout starts, send
 *    the same array through cartAttributesUpdate before you hand the customer
 *    to checkoutUrl. See the bottom of this file for both shapes.
 *
 * That is the whole change. It does not touch prices, products, the cart
 * contents, or anything the customer sees.
 *
 * ---------------------------------------------------------------------------
 * TWO THINGS THAT LOOK LIKE DETAILS AND ARE NOT
 * ---------------------------------------------------------------------------
 * - The fbc timestamp must be the moment of the CLICK, which is why it is
 *   built on arrival and stored, not built at checkout. Stamping it at
 *   checkout dates the click to hours after it happened, and a conversion
 *   whose fbc is that far adrift is much weaker inside an attribution window.
 *
 * - An existing _fbp cookie always wins over anything we would invent, because
 *   the pixel that set it knows the real value.
 *
 * NEVER put email, phone, name or any other personal data in cart attributes.
 * Click identifiers only. They are visible in the Shopify admin.
 */

var REGENT_KEYS = [
  'fbclid',
  'gclid',
  'ttclid',
  'msclkid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'cc_cid',
  'cc_sid',
  'cc_aid',
  'cc_pl',
  'cc_ssn',
];

/** Storage can throw in private mode. It must never break the store. */
function rpRead(key) {
  try {
    return window.localStorage.getItem('rp_' + key);
  } catch (e) {
    return null;
  }
}

function rpWrite(key, value) {
  try {
    window.localStorage.setItem('rp_' + key, value);
  } catch (e) {
    /* ignore */
  }
}

function rpCookie(name) {
  var hit = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return hit ? hit[1] : null;
}

/**
 * Read the landing URL once and remember it for the visit.
 * Safe to call on every route change; it only writes what it finds.
 */
function captureRegentAttribution() {
  var q = new URLSearchParams(window.location.search);

  for (var i = 0; i < REGENT_KEYS.length; i++) {
    var v = q.get(REGENT_KEYS[i]);
    if (v) rpWrite(REGENT_KEYS[i], v);
  }

  // fbc, in Meta's format fb.1.<click time>.<fbclid>, in order of trust:
  //   1. an existing _fbc cookie, which holds the true click time
  //   2. one we already built this visit, so the original stamp survives a
  //      refresh or a route change
  //   3. a new one stamped NOW, which on first load IS the click
  var fbc = rpCookie('_fbc') || rpRead('fbc');
  var fbclid = q.get('fbclid');

  if (fbclid) {
    // Rebuild when the fbclid itself changed: that is a different ad click,
    // and a stale fbc with a fresh fbclid credits the wrong ad.
    var previous = fbc ? fbc.split('.').slice(3).join('.') : null;
    if (!fbc || previous !== fbclid) {
      fbc = 'fb.1.' + Date.now() + '.' + fbclid;
    }
  }

  if (fbc) rpWrite('fbc', fbc);
  return fbc;
}

/**
 * The attributes to attach to the Shopify cart.
 * Returns [] when there is nothing to attach, which is a valid input.
 */
function regentCartAttributes() {
  var out = [];

  var push = function (key, value) {
    if (value) out.push({ key: key, value: String(value).slice(0, 255) });
  };

  // These two names matter. Our server looks for exactly `fbc` and `_fbp`.
  push('fbc', rpCookie('_fbc') || rpRead('fbc'));
  push('_fbp', rpCookie('_fbp'));

  push('cc_cid', rpRead('cc_cid'));
  push('cc_sid', rpRead('cc_sid'));
  push('cc_aid', rpRead('cc_aid'));

  return out;
}

/* ---------------------------------------------------------------------------
 * USAGE
 * -------------------------------------------------------------------------

 // 1. On first load, as early as you can.
 captureRegentAttribution();

 // 2a. Creating the cart:
 const input = {
   lines: yourExistingLines,
   attributes: regentCartAttributes(),
 };
 // mutation cartCreate($input: CartInput!) {
 //   cartCreate(input: $input) { cart { id checkoutUrl } }
 // }

 // 2b. Or, if the cart already exists, just before sending them to checkout:
 // mutation cartAttributesUpdate($cartId: ID!, $attributes: [AttributeInput!]!) {
 //   cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
 //     cart { id checkoutUrl }
 //   }
 // }
 // variables: { cartId, attributes: regentCartAttributes() }

 * ------------------------------------------------------------------------- */

export { captureRegentAttribution, regentCartAttributes };
