var canvasConfetti, ctx, W_Confetti, H_Confetti;

if (988 <= screen.width) var mp_Confetti = 150;
else mp_Confetti = 75;

var deactivationTimerHandler, reactivationTimerHandler, animationHandler,
  particles = [],
  angleConfetti = 0,
  tiltAngle = 0,
  confettiActive = !1,
  confettiIniciated = !1,
  animationComplete = !0,
  particleColors = {
    colorOptions: ["DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"],
    colorIndex: 0,
    colorIncrementer: 0,
    colorThreshold: 10,
    getColor: function() {
      return 10 <= this.colorIncrementer && (this.colorIncrementer = 0, this.colorIndex++, this.colorIndex >= this.colorOptions.length && (this.colorIndex = 0)), this.colorIncrementer++, this.colorOptions[this.colorIndex]
    }
  };

function confettiParticle(t) {
  this.x = Math.random() * W_Confetti, this.y = Math.random() * H_Confetti - H_Confetti, this.r = RandomFromTo(10, 30), this.d = Math.random() * mp_Confetti + 10, this.color = t, this.tilt = Math.floor(10 * Math.random()) - 10, this.tiltAngleIncremental = .07 * Math.random() + .05, this.tiltAngle = 0, this.draw = function() {
    return ctx.beginPath(), ctx.lineWidth = this.r / 2, ctx.strokeStyle = this.color, ctx.moveTo(this.x + this.tilt + this.r / 4, this.y), ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4), ctx.stroke()
  }
}

function SetGlobalsConfetti() {
  canvasConfetti = document.getElementById("canvasConfetti"), ctx = canvasConfetti.getContext("2d"), W_Confetti = window.innerWidth, H_Confetti = window.innerHeight, canvasConfetti.width = W_Confetti, canvasConfetti.height = H_Confetti
}

function InitializeConfetti() {
  animationComplete = !(particles = []);
  for (var t = 0; t < mp_Confetti; t++) {
    var e = particleColors.getColor();
    particles.push(new confettiParticle(e))
  }
  StartConfetti()
}

function Draw() {
  ctx.clearRect(0, 0, W_Confetti, H_Confetti);
  for (var t, e = [], n = 0; n < mp_Confetti; n++) t = n, e.push(particles[t].draw());
  return UpdateConfetti(), e
}

function RandomFromTo(t, e) {
  return Math.floor(Math.random() * (e - t + 1) + t)
}

function UpdateConfetti() {
  var t, e = 0;
  angleConfetti += .01, tiltAngle += .1;
  for (var n = 0; n < mp_Confetti; n++) {
    if (t = particles[n], animationComplete) return;
    !confettiActive && t.y < -15 ? t.y = H_Confetti + 100 : (stepParticleConfetti(t, n), t.y <= H_Confetti && e++, CheckForRepositionConfetti(t, n))
  }
  0 === e && StopConfetti()
}

function CheckForRepositionConfetti(t, e) {
  (t.x > W_Confetti + 20 || t.x < -20 || t.y > H_Confetti) && confettiActive && (0 < e % 5 || e % 2 == 0 ? repositionParticleConfetti(t, Math.random() * W_Confetti, -10, Math.floor(10 * Math.random()) - 10) : 0 < Math.sin(angleConfetti) ? repositionParticleConfetti(t, -5, Math.random() * H_Confetti, Math.floor(10 * Math.random()) - 10) : repositionParticleConfetti(t, W_Confetti + 5, Math.random() * H_Confetti, Math.floor(10 * Math.random()) - 10))
}

function stepParticleConfetti(t, e) {
  t.tiltAngle += t.tiltAngleIncremental, t.y += (Math.cos(angleConfetti + t.d) + 3 + t.r / 2) / 2, t.x += Math.sin(angleConfetti), t.tilt = 15 * Math.sin(t.tiltAngle - e / 3)
}

function repositionParticleConfetti(t, e, n, o) {
  t.x = e, t.y = n, t.tilt = o
}

function StartConfetti() {
  confettiActive = !0, W_Confetti = window.innerWidth, H_Confetti = window.innerHeight, canvasConfetti.width = W_Confetti, canvasConfetti.height = H_Confetti,
    function t() {
      return animationComplete ? null : (animationHandler = requestAnimFrame(t), Draw())
    }()
}

function ClearTimers() {
  clearTimeout(reactivationTimerHandler), clearTimeout(animationHandler)
}

function DeactivateConfetti() {
  confettiActive = !1, ClearTimers()
}

function StopConfetti() {
  animationComplete = !0, null != ctx && ctx.clearRect(0, 0, W_Confetti, H_Confetti)
}

function RestartConfetti() {
  ClearTimers(), StopConfetti(), reactivationTimerHandler = setTimeout(function() {
    animationComplete = !(confettiActive = !0), InitializeConfetti()
  }, 100)
}

function SetupConfetti() {
  SetGlobalsConfetti(), InitializeConfetti(), confettiIniciated = !0, jQuery(window).resize(function() {
    W_Confetti = window.innerWidth, H_Confetti = window.innerHeight, canvasConfetti.width = W_Confetti, canvasConfetti.height = H_Confetti
  })
}

window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
  return window.setTimeout(t, 1e3 / 60)
}, jQuery(document).ready(function() {
  "undefined" == typeof confetti_ini && 0 < jQuery("#canvasConfetti").length && SetupConfetti()
});
var boxRoot, count = 0,
  intentos = 3,
  puedo = !1;
! function() {
  "use strict";
  boxRoot = {
    _init: function() {
      setTimeout(function() {
        jQuery("#p_modal1").modal(modalOptions)
      }, 1e3), jQuery(".css2008_32").on("click", function() {
        if (puedo && 0 < intentos)
          if (jQuery(this).hasClass("abierta"));
          else switch (puedo = !1, jQuery(".circle-loader").removeClass("load-complete"), jQuery(".css2008_38").css("display", "none"), jQuery(this).addClass("abierta"), intentos--, ++count) {
            case 2:
              jQuery(this).addClass("premiazo"), setTimeout(function() {
                "function" == typeof SetupConfetti && 0 < jQuery("#canvasConfetti").length && (confettiIniciated ? RestartConfetti() : SetupConfetti()), jQuery(".css2008_26, .css2008_27").fadeIn("slow", function() {
                  setTimeout(function() {
                    jQuery("#p_modal3").modal(modalOptions), jQuery(".css2008_37").addClass("load-complete"), jQuery(".css2008_38").css("display", "block")
                  }, 1500)
                })
              }, 4e3);
              break;
            default:
              jQuery("#num_intentos, .num_intentos").html(intentos), setTimeout(function() {
                jQuery("#p_modal2").modal(modalOptions), setTimeout(function() {
                  jQuery(".css2008_37").addClass("load-complete"), jQuery(".css2008_38").css("display", "block"), puedo = !0
                }, 1e3)
              }, 2e3)
          }
      }), jQuery("#p_modal_button1").on("click", function(t) {
        t.stopPropagation(), jQuery("#p_modal1").modal("hide"), puedo = !0
      }), jQuery("#p_modal_button2").on("click", function(t) {
        t.stopPropagation(), jQuery("#p_modal2").modal("hide")
      }), jQuery("#p_modal_button3").on("click", function(t) {
        t.stopPropagation(), jQuery("#p_modal3").modal("hide"), stepfinal(), goToUrlFinish()
      })
    }
  }, jQuery(document).ready(function() {
    "undefined" == typeof box_ini && 0 < jQuery("#boxes").length && boxRoot._init()
  })
}();
