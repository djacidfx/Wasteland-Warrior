! function() {
    
    function getJsonFromUrl() {
        var query = location.search.substr(1);
        var result = {};

        var queryList = query.split("&");
        for (var i = 0; i < queryList.length; i++) {
            var pos = queryList[i].indexOf("=");
            var item = [queryList[i].substring(0, pos), queryList[i].substring(pos + 1)];
            result[item[0]] = decodeURIComponent(item[1]);
        }

        return result;
    }
    SoundManager = function(a) {
        this.game = a;
        try {
            this.musicPlaying = this.soundPlaying = SOUNDS_ENABLED, localStorage.getItem("pwrwl-sounds") && (this.soundPlaying = SOUNDS_ENABLED && !0 === JSON.parse(localStorage.getItem("pwrwl-sounds"))), localStorage.getItem("pwrwl-music") && (this.musicPlaying = SOUNDS_ENABLED && !0 === JSON.parse(localStorage.getItem("pwrwl-music")))
        } catch (b) {
            this.musicPlaying = this.soundPlaying = SOUNDS_ENABLED
        }
        GameData.BuildDebug && (this.soundPlaying = this.musicPlaying = !1);
        this.music = [];
        this.sounds = [];
        this.prevSoundPlayed =
            this.actualMusic = null
    };
    SoundManager.prototype = {
        constructor: SoundManager,
        create: function() {
            this.addMusic("music_menu", .4, !0);
            this.addMusic("music_game", .5, !0);
            this.addSound("exceptional_text", .3);
            this.addSound("tiles_match", .4);
            this.addSound("tile_select", .4);
            this.addSound("lost_star2", .3);
            this.addSound("level-start-tiles-only-reshufle", .4);
            this.addSound("tile_wrong-one", .4);
            this.addSound("menu-click1", .4);
            this.addSound("menu-negative1", .4);
            this.addSound("level-start-gank-with-tiles", .4);
            this.addSound("result_bronze-silver-star", .4);
            this.addSound("result_gold-star", .4);
            this.addSound("undo", .4);
            this.addSound("result_item_appear", .4);
            this.addSound("laser", .1);
            this.addSound("rocket", .2);
            this.addSound("coin", .3);
            this.addSound("kaching", .2);
            this.addSound("cnt", 1);
            this.addSound("laser2", .4);
            this.addSound("playerHit", .4);
            this.addSound("bounce", .4);
            this.addSound("expl1", .3, !1, onExplosionSndPlayed);
            this.addSound("expl2", .3, !1, onExplosionSndPlayed);
            this.addSound("expl3", .3, !1, onExplosionSndPlayed);
            this.addSound("expl4", .3, !1, onExplosionSndPlayed);
            this.addSound("powerwall", .5, !0)
        },
        addMusic: function(a, b, c) {
            void 0 === c && (c = !1);
            this.music[a] = game.add.audio(a, b, c)
        },
        addSound: function(a, b, c, d) {
            void 0 === c && (c = !1);
            void 0 === d && (d = null);
            this.sounds[a] = game.add.audio(a, b, c);
            null != d && this.sounds[a].onStop.add(d, this)
        },
        playMusic: function(a, b) {
            void 0 === b && (b = !1);
            if (a != this.actualMusic || b) this.actualMusic = a;
            if (this.musicPlaying)
                for (var c in this.music) "contains" != c && (c == this.actualMusic ? this.music[c].play() : this.music[c].stop())
        },
        playSound: function(a) {
            if (this.soundPlaying) try {
                this.sounds[a].play()
            } catch (b) {
                LOG("Failed to play sound : " +
                    a)
            }
        },
        pauseMusic: function() {
            if (this.musicPlaying)
                for (var a in this.music) "contains" != a && a == this.actualMusic && this.music[a].pause()
        },
        resumeMusic: function() {
            if (this.musicPlaying)
                for (var a in this.music) "contains" != a && a == this.actualMusic && this.music[a].resume()
        },
        stopMusic: function() {
            for (var a in this.music) "contains" != a && this.music[a].stop()
        },
        toggleMusic: function(a) {
            this.musicPlaying ? (this.musicPlaying = !1, this.stopMusic()) : (this.musicPlaying = !0, this.playMusic(a));
            try {
                localStorage.setItem("pwrwl-music",
                    this.musicPlaying)
            } catch (b) {}
        },
        toggleSounds: function() {
            if (this.soundPlaying) {
                this.soundPlaying = !1;
                for (var a in this.sounds) "contains" != a && this.sounds[a].stop()
            } else this.soundPlaying = !0;
            try {
                localStorage.setItem("pwrwl-sounds", this.soundPlaying)
            } catch (b) {}
        }
    };
    var explosions = ["expl1", "expl2", "expl3", "expl4"];

    function playExplosion() {
        soundManager.soundPlaying && 0 != explosions.length && (shuffleArray(explosions), soundManager.playSound(explosions[0]), explosions.splice(0, 1))
    }

    function onExplosionSndPlayed(a) {
        explosions.push(a.name)
    };
    Particles = function(a) {
        this.MAX_PARTICLES = 50;
        Phaser.Device.desktop || (this.MAX_PARTICLES = 30);
        this.objParticles = [];
        this._init();
        Particles.instance = this
    };
    Particles.instance = null;
    Particles.prototype = {
        constructor: Particles,
        _init: function(a) {
            this.grpParticles = game.add.group();
            a = {
                tag: "",
                velX: 0,
                velY: 0,
                accX: 0,
                accY: 0,
                sprite: "pak2",
                frameName: "blankw.png"
            };
            for (var b = 0; b < this.MAX_PARTICLES; b++) this.CreateParticle(0, 0, a);
            for (b = 0; b < this.MAX_PARTICLES; b++) this.objParticles[b].sprite.visible = !1
        },
        CreateParticle: function(a, b, c) {
            c.hasOwnProperty("tag") || (c.tag = "");
            c.hasOwnProperty("frame") || (c.frame = 0);
            c.hasOwnProperty("blendMode") || (c.blendMode = PIXI.blendModes.NORMAL);
            c.hasOwnProperty("life") ||
                (c.life = 500 + getRandomUInt(200));
            c.hasOwnProperty("velX") || (c.velX = 0);
            c.hasOwnProperty("velY") || (c.velY = 0);
            c.hasOwnProperty("accX") || (c.accX = 0);
            c.hasOwnProperty("accY") || (c.accY = 0);
            c.hasOwnProperty("rotation") || (c.rotation = 0);
            c.hasOwnProperty("scale") ? (c.scale.hasOwnProperty("start") || (c.scale.start = 1), c.scale.hasOwnProperty("end") || (c.scale.end = c.scale.start)) : c.scale = {
                start: 1,
                end: 1
            };
            c.scale.delta = c.scale.start - c.scale.end;
            c.hasOwnProperty("alpha") ? (c.alpha.hasOwnProperty("start") || (c.alpha.start =
                1), c.alpha.hasOwnProperty("end") || (c.alpha.end = c.alpha.start)) : c.alpha = {
                start: 1,
                end: 1
            };
            c.alpha.delta = c.alpha.start - c.alpha.end;
            for (var d = null, e = 0; e < this.objParticles.length && null == d; e++) this.objParticles[e].sprite.visible || (d = this.objParticles[e], d.sprite.key != c.sprite && d.sprite.loadTexture(c.sprite), d.sprite.frame = c.frame, c.hasOwnProperty("frameName") && (d.sprite.frameName = c.frameName));
            if (null === d) {
                if (this.objParticles.length == this.MAX_PARTICLES) return null;
                d = this.objParticles[this.objParticles.length] = {};
                d.sprite = this.grpParticles.create(-100, -100, c.sprite, c.frame);
                d.sprite.anchor.set(.5);
                c.hasOwnProperty("frameName") && (d.sprite.frameName = c.frameName)
            }
            game.world.bringToTop(d.sprite);
            d.sprite.visible = !0;
            d.sprite.alpha = c.alpha.start;
            d.sprite.angle = 0;
            d.sprite.x = a;
            d.sprite.y = b;
            d.sprite.scale.set(1);
            d.sprite.tint = 16777215;
            d.sprite.blendMode = c.blendMode;
            d.data = c;
            d.data.lifeInit = c.life;
            return d
        },
        Reset: function() {
            for (var a = 0; a < this.objParticles.length; a++) this.objParticles[a].sprite.visible = !1
        },
        GetActiveCount: function(a) {
            a =
                a || null;
            for (var b = 0, c = 0; c < this.objParticles.length; c++)(null == a || this.objParticles[c].data.tag == a) && this.objParticles[c].sprite.visible && 0 < objParticles[c].data.life && b++;
            return b
        },
        Update: function() {
            for (var a = 0; a < this.objParticles.length; a++) this.objParticles[a].sprite.visible && (this.objParticles[a].data.life -= game.time.elapsedMS, 0 >= this.objParticles[a].data.life ? this.objParticles[a].sprite.visible = !1 : (this.objParticles[a].sprite.alpha = this.objParticles[a].data.alpha.start - this.objParticles[a].data.alpha.delta +
                this.objParticles[a].data.life / this.objParticles[a].data.lifeInit * this.objParticles[a].data.alpha.delta, this.objParticles[a].sprite.scale.set(this.objParticles[a].data.scale.start - this.objParticles[a].data.scale.delta + this.objParticles[a].data.life / this.objParticles[a].data.lifeInit * this.objParticles[a].data.scale.delta), this.objParticles[a].sprite.angle += this.objParticles[a].data.rotation, this.objParticles[a].sprite.x += this.objParticles[a].data.velX, this.objParticles[a].sprite.y += this.objParticles[a].data.velY,
                this.objParticles[a].data.velX += this.objParticles[a].data.accX, this.objParticles[a].data.velY += this.objParticles[a].data.accY))
        },
        Destroy: function() {
            for (var a = 0; a < this.objParticles.length; a++) this.objParticles[a].sprite.destroy(), this.objParticles[a].sprite = null, this.objParticles[a] = null;
            this.objParticles = null
        },
        CreateBubbles: function(a, b, c, d, e, f) {
            f = f || PIXI.blendModes.NORMAL;
            for (d = (d || 10) - 1; 0 <= d; d--) {
                tmpX = game.rnd.integerInRange(-100, 100) / 30;
                tmpY = game.rnd.integerInRange(50, 100) / 1E3;
                var g = (5 + getRandomUInt(5)) /
                    10,
                    l = (2 + getRandomUInt(5)) / 10,
                    g = {
                        velX: 0,
                        velY: -tmpY,
                        accX: 0,
                        accY: 0 >= tmpY ? .01 : -.01,
                        sprite: "pak2",
                        frameName: "particle_smallest.png",
                        blendMode: f,
                        rotation: 4,
                        scale: {
                            start: g,
                            end: g
                        },
                        alpha: {
                            start: l,
                            end: l
                        },
                        life: e
                    },
                    g = this.CreateParticle(a + game.rnd.integerInRange(-6, 6), b + game.rnd.integerInRange(-4, 4), g);
                null != g && (g.sprite.tint = c)
            }
        },
        CreateTrail: function(a, b, c) {
            particlesCount = 1;
            blendMode = PIXI.blendModes.ADD;
            life = 700;
            Phaser.Device.desktop || (life = Math.ceil(.6 * life));
            for (var d = particlesCount - 1; 0 <= d; d--) {
                getRandomUInt(5);
                getRandomUInt(5);
                var e = this.CreateParticle(a, b, {
                    velX: 0,
                    velY: 0,
                    accX: 0,
                    accY: 0,
                    sprite: "pak2",
                    frameName: "dot_1.png",
                    blendMode: blendMode,
                    rotation: 0,
                    scale: {
                        start: 1,
                        end: .3
                    },
                    alpha: {
                        start: .6,
                        end: 0
                    },
                    life: life
                });
                null != e && (e.sprite.tint = c)
            }
        },
        CreateStars: function(a, b, c, d, e) {
            e = e || PIXI.blendModes.NORMAL;
            for (d = (d || 10) - 1; 0 <= d; d--) {
                tmpX = game.rnd.integerInRange(-100, 100) / 20;
                tmpY = game.rnd.integerInRange(-100, 100) / 20;
                var f = {
                        velX: tmpX,
                        velY: tmpY,
                        accX: 0 >= tmpX ? .01 : -.01,
                        accY: 0 >= tmpY ? .01 : -.01,
                        sprite: "pak2",
                        frameName: "star_particles.png",
                        blendMode: e,
                        rotation: 4,
                        scale: {
                            start: .7,
                            end: 2
                        },
                        alpha: {
                            start: .7,
                            end: 0
                        },
                        life: 700
                    },
                    f = this.CreateParticle(a + game.rnd.integerInRange(-4, 4), b + game.rnd.integerInRange(-4, 4), f);
                null != f && (f.sprite.tint = c)
            }
        },
        CreateFinalStars: function(a, b, c, d, e) {
            void 0 === d && (d = d || 10);
            void 0 === e && (e = PIXI.blendModes.ADD);
            for (--d; 0 <= d; d--) {
                tmpX = game.rnd.integerInRange(-100, 100) / 50;
                tmpY = game.rnd.integerInRange(-100, 100) / 50;
                var f = getRandomUInt(20) / 100,
                    f = {
                        velX: tmpX,
                        velY: tmpY,
                        accX: 0 >= tmpX ? .02 : -.02,
                        accY: 0 >= tmpY ? .02 : -.02,
                        sprite: "pak2",
                        frameName: "star_particles.png",
                        blendMode: e,
                        rotation: 4,
                        scale: {
                            start: .7 * (1.2 - f),
                            end: .7 * (2.3 - f)
                        },
                        alpha: {
                            start: 1,
                            end: 0
                        },
                        life: 600
                    },
                    f = this.CreateParticle(a + game.rnd.integerInRange(-10, 10), b + game.rnd.integerInRange(-10, 10), f);
                null != f && (f.sprite.tint = c)
            }
        },
        CreateNewBestStars: function(a, b, c, d, e) {
            void 0 === d && (d = d || 10);
            void 0 === e && (e = PIXI.blendModes.ADD);
            for (--d; 0 <= d; d--) {
                tmpX = game.rnd.integerInRange(-100, 100) / 50;
                tmpY = game.rnd.integerInRange(-100, 100) / 50;
                var f = getRandomUInt(20) / 100,
                    f = {
                        velX: 0,
                        velY: 0,
                        accX: 0 >= tmpX ?
                            .01 : -.01,
                        accY: 0 >= tmpY ? .01 : -.01,
                        sprite: "pak2",
                        frameName: "star_particles.png",
                        blendMode: e,
                        rotation: 4,
                        scale: {
                            start: 1.2 - f,
                            end: 2.4 - f
                        },
                        alpha: {
                            start: 1,
                            end: 0
                        },
                        life: 400 + 20 * getRandomUInt(10)
                    },
                    f = this.CreateParticle(a + game.rnd.integerInRange(-10, 10), b + game.rnd.integerInRange(-10, 10), f);
                null != f && (f.sprite.tint = c)
            }
        },
        CreateFallingStars: function(a, b, c) {
            particlesCount = 6;
            for (var d = particlesCount - 1; 0 <= d; d--) {
                var e = game.rnd.integerInRange(-100, 100) / 50,
                    f = game.rnd.integerInRange(-100, 100) / 50;
                this.CreateParticle(a, b, {
                    velX: e,
                    velY: f,
                    accX: 0 >= e ? .01 : -.01,
                    accY: 0 >= f ? .01 : -.01,
                    sprite: "pak2",
                    frameName: c,
                    blendMode: PIXI.blendModes.NORMAL,
                    rotation: 0,
                    scale: {
                        start: 1,
                        end: .3
                    },
                    alpha: {
                        start: .7,
                        end: 0
                    },
                    life: 500
                })
            }
        },
        CreateExplosion: function(a, b) {
            var c = ["explode_7.png", "explode_8.png", "explode_9.png", "explode_10.png", "explode_11.png"];
            shuffleArray(c);
            particlesCount = 4;
            for (var d = particlesCount - 1; 0 <= d; d--) {
                var e = game.rnd.integerInRange(-100, 100) / 40,
                    f = game.rnd.integerInRange(-100, 100) / 40,
                    e = {
                        velX: e,
                        velY: f,
                        accX: 0 >= e ? .01 : -.01,
                        accY: 0 >= f ? .01 : -.01,
                        sprite: "pak2",
                        frameName: c[d],
                        blendMode: PIXI.blendModes.NORMAL,
                        rotation: game.rnd.integerInRange(-100, 100) / 40,
                        scale: {
                            start: .7,
                            end: .3
                        },
                        alpha: {
                            start: .7,
                            end: 0
                        },
                        life: 500
                    };
                this.CreateParticle(a + game.rnd.integerInRange(-100, 100) / 5, b + game.rnd.integerInRange(-100, 100) / 5, e)
            }
        },
        CreateCarExplodingParts: function(a, b, c) {
            c = [];
            for (var d = 1; 10 >= d; d++) c.push("part" + d + ".png");
            shuffleArray(c);
            particlesCount = 5;
            for (d = particlesCount - 1; 0 <= d; d--) {
                var e = game.rnd.integerInRange(-100, 100) / 25,
                    f = game.rnd.integerInRange(-100, 100) /
                    30,
                    e = {
                        velX: e,
                        velY: f,
                        accX: 0 >= e ? .01 : -.01,
                        accY: 0 >= f ? .01 : -.01,
                        sprite: "pak2",
                        frameName: c[d],
                        blendMode: PIXI.blendModes.NORMAL,
                        rotation: game.rnd.integerInRange(-100, 100) / 25,
                        scale: {
                            start: 1,
                            end: .8
                        },
                        alpha: {
                            start: 1,
                            end: 0
                        },
                        life: 500 + 10 * getRandomUInt(10)
                    };
                this.CreateParticle(a + game.rnd.integerInRange(-100, 100) / 5, b + game.rnd.integerInRange(-100, 100) / 5, e)
            }
        }
    };
    BitmapTextParticles = function(a) {
        this.MAX_PARTICLES = 3;
        this.objBitmapTextParticles = [];
        this._init();
        BitmapTextParticles.instance = this
    };
    BitmapTextParticles.instance = null;
    BitmapTextParticles.prototype = {
        constructor: BitmapTextParticles,
        _init: function(a) {
            this.grpBitmapTextParticles = game.add.group();
            a = {
                tag: "",
                velX: 0,
                velY: 0,
                accX: 0,
                accY: 0
            };
            for (var b = 0; b < this.MAX_PARTICLES; b++) this.CreateTextParticle(0, 0, "DUMMY", a);
            for (b = 0; b < this.MAX_PARTICLES; b++) this.objBitmapTextParticles[b].sprite.visible = !1
        },
        CreateTextParticle: function(a, b, c, d) {
            d.hasOwnProperty("tag") || (d.tag = "");
            d.hasOwnProperty("tint") || (d.tint = 16777215);
            d.hasOwnProperty("fontSize") || (d.fontSize = 20);
            d.hasOwnProperty("blendMode") ||
                (d.blendMode = PIXI.blendModes.NORMAL);
            d.hasOwnProperty("life") || (d.life = 500 + getRandomUInt(200));
            d.hasOwnProperty("velX") || (d.velX = 0);
            d.hasOwnProperty("velY") || (d.velY = 0);
            d.hasOwnProperty("accX") || (d.accX = 0);
            d.hasOwnProperty("accY") || (d.accY = 0);
            d.hasOwnProperty("rotation") || (d.rotation = 0);
            d.hasOwnProperty("scale") ? (d.scale.hasOwnProperty("start") || (d.scale.start = 1), d.scale.hasOwnProperty("end") || (d.scale.end = d.scale.start)) : d.scale = {
                start: 1,
                end: 1
            };
            d.scale.delta = d.scale.start - d.scale.end;
            d.hasOwnProperty("alpha") ?
                (d.alpha.hasOwnProperty("start") || (d.alpha.start = 1), d.alpha.hasOwnProperty("end") || (d.alpha.end = d.alpha.start)) : d.alpha = {
                    start: 1,
                    end: 1
                };
            d.alpha.delta = d.alpha.start - d.alpha.end;
            var e = null;
            fntFile = "gamefont_TA";
            "ru" == language && (fntFile = "gamefont_RU");
            for (var f = 0; f < this.objBitmapTextParticles.length && null == e; f++) this.objBitmapTextParticles[f].sprite.visible || (e = this.objBitmapTextParticles[f], e.sprite.font = fntFile, e.sprite.text = c);
            null === e && (e = this.objBitmapTextParticles[this.objBitmapTextParticles.length] = {}, e.sprite = game.add.bitmapText(-100, -100, fntFile, c, d.fontSize), this.grpBitmapTextParticles.add(e.sprite), e.sprite.anchor.set(.5));
            game.world.bringToTop(e.sprite);
            e.sprite.visible = !0;
            e.sprite.alpha = d.alpha.start;
            e.sprite.angle = 0;
            e.sprite.x = a;
            e.sprite.y = b;
            e.sprite.scale.set(1);
            e.sprite.tint = d.tint;
            e.sprite.fontSize = d.fontSize;
            e.sprite.blendMode = d.blendMode;
            e.data = d;
            e.data.lifeInit = d.life;
            0 < d.tag.length && LOG("TILES : " + Particles.instance.GetActiveCount(d.tag));
            return e
        },
        Reset: function() {
            for (var a = 0; a <
                this.objBitmapTextParticles.length; a++) this.objBitmapTextParticles[a].sprite.visible = !1
        },
        GetActiveCount: function(a) {
            a = a || null;
            for (var b = 0, c = 0; c < this.objBitmapTextParticles.length; c++)(null == a || this.objBitmapTextParticles[c].data.tag == a) && this.objBitmapTextParticles[c].sprite.visible && 0 < this.objBitmapTextParticles[c].data.life && b++;
            return b
        },
        Update: function() {
            for (var a = 0; a < this.objBitmapTextParticles.length; a++) this.objBitmapTextParticles[a].sprite.visible && (this.objBitmapTextParticles[a].data.life -=
                game.time.elapsedMS, 0 >= this.objBitmapTextParticles[a].data.life ? this.objBitmapTextParticles[a].sprite.visible = !1 : (this.objBitmapTextParticles[a].sprite.alpha = this.objBitmapTextParticles[a].data.alpha.start - this.objBitmapTextParticles[a].data.alpha.delta + this.objBitmapTextParticles[a].data.life / this.objBitmapTextParticles[a].data.lifeInit * this.objBitmapTextParticles[a].data.alpha.delta, this.objBitmapTextParticles[a].sprite.scale.set(this.objBitmapTextParticles[a].data.scale.start - this.objBitmapTextParticles[a].data.scale.delta +
                        this.objBitmapTextParticles[a].data.life / this.objBitmapTextParticles[a].data.lifeInit * this.objBitmapTextParticles[a].data.scale.delta), this.objBitmapTextParticles[a].sprite.angle += this.objBitmapTextParticles[a].data.rotation, this.objBitmapTextParticles[a].sprite.x += this.objBitmapTextParticles[a].data.velX, this.objBitmapTextParticles[a].sprite.y += this.objBitmapTextParticles[a].data.velY, this.objBitmapTextParticles[a].data.velX += this.objBitmapTextParticles[a].data.accX, this.objBitmapTextParticles[a].data.velY +=
                    this.objBitmapTextParticles[a].data.accY))
        },
        Destroy: function() {
            for (var a = 0; a < this.objBitmapTextParticles.length; a++) this.objBitmapTextParticles[a].sprite.Destroy(), this.objBitmapTextParticles[a].sprite = null, this.objBitmapTextParticles[a] = null;
            this.objBitmapTextParticles = null
        },
        CreateTextParticle1: function(a, b, c, d, e, f) {
            f = f || PIXI.blendModes.NORMAL;
            tmpY = game.rnd.integerInRange(-100, -50) / 50;
            this.CreateTextParticle(a, b, c, {
                velX: 0,
                velY: tmpY,
                accX: 0,
                accY: 0 >= tmpY ? .02 : -.02,
                fontSize: d,
                tint: e,
                blendMode: f,
                rotation: 0,
                scale: {
                    start: 1.2,
                    end: 1
                },
                alpha: {
                    start: .9,
                    end: 0
                },
                life: 1E3
            })
        },
        CreateTextParticleLevel: function(a, b, c, d, e, f) {
            f = f || PIXI.blendModes.NORMAL;
            d = {
                velX: 0,
                velY: -1,
                accX: 0,
                accY: .01,
                fontSize: d,
                tint: 2236962,
                blendMode: f,
                rotation: 0,
                scale: {
                    start: 1.5,
                    end: 1.2
                },
                alpha: {
                    start: .9,
                    end: 0
                },
                life: 2E3
            };
            this.CreateTextParticle(a, b, c, d);
            d.tint = e;
            this.CreateTextParticle(a - 3, b - 3, c, d)
        }
    };
    CoinParticles = function(a) {
        this.MAX_PARTICLES = 10;
        this.DURATION = 2 * ScenesTransitions.TRANSITION_LENGTH;
        this.DELAY = ScenesTransitions.TRANSITION_LENGTH / 3;
        this.objCoinParticles = [];
        this._init();
        CoinParticles.instance = this
    };
    CoinParticles.instance = null;
    CoinParticles.prototype = {
        constructor: CoinParticles,
        _init: function(a) {
            for (a = 0; 10 > a; a++) this.objCoinParticles[a] = game.add.sprite(-1E3, -1E3, "pak2", "bonus_cash.png"), this.objCoinParticles[a].anchor.set(.5), this.objCoinParticles[a].twnMove = null, this.objCoinParticles[a].twnScale = null
        },
        Reset: function() {
            for (var a = 0; a < this.objCoinParticles.length; a++) this.objCoinParticles[a].visible = !1, null != this.objCoinParticles[a].twnMove && this.objCoinParticles[a].twnMove.stop(), null != this.objCoinParticles[a].twnScale &&
                this.objCoinParticles[a].twnScale.stop(), game.tweens.removeFrom(this.objCoinParticles[a], !0)
        },
        AnimateCoins: function(a, b, c, d, e, f, g, l, h) {
            void 0 === f && (f = null);
            void 0 === g && (g = null);
            void 0 === l && (l = .7);
            void 0 === h && (h = .5);
            ScenesTransitions.transitionStarted();
            e.val = parseInt(e.textTop.text);
            var n = e.val + a,
                m = a,
                k = 0,
                q = Math.ceil(a / 10);
            1 > q && (q = 1);
            10 < a && (m = Math.floor(a / q), k = a - m * q);
            CoinParticles.instance.Reset();
            for (var p = 0; p < m; p++) {
                var t = q;
                p == m - 1 && (t += k);
                a -= t;
                this.objCoinParticles[p].position.setTo(b.worldPosition.x,
                    b.worldPosition.y);
                this.objCoinParticles[p].scale.set(l);
                this.objCoinParticles[p].visible = !0;
                MoveSpriteBezier(this.objCoinParticles[p], c.worldPosition.x, c.worldPosition.y, this.DURATION, p * this.DELAY, 1, function() {}, null);
                this.objCoinParticles[p].twnScale = game.add.tween(this.objCoinParticles[p].scale);
                this.objCoinParticles[p].twnScale.to({
                    x: h,
                    y: h
                }, this.DURATION, "Linear", !0, p * this.DELAY);
                this.objCoinParticles[p].twnScale.onStart.add(function() {
                    soundManager.playSound("coin")
                }, {
                    coinParticle: this.objCoinParticles[p],
                    txtObj: d,
                    val: a
                });
                this.objCoinParticles[p].twnScale.onComplete.add(function() {
                    this.txtObj.val += this.inc;
                    setShadowBitmapText(this.txtObj, "" + this.txtObj.val);
                    this.coinParticle.visible = !1;
                    this.lastOne && (ScenesTransitions.transitionFinished(), setShadowBitmapText(this.txtObj, "" + this.finalVal), null != f && f(this.params))
                }, {
                    coinParticle: this.objCoinParticles[p],
                    txtObj: e,
                    inc: t,
                    finalVal: n,
                    lastOne: p == m - 1,
                    callback: f,
                    params: g
                })
            }
        }
    };
    var Languages = function() {
            if (null != Languages.instance) return Languages.instance;
            Languages.instance = this;
            this.xml = this.gameTextsParsed = null;
            this.gameTextsLists = [];
            var a = game.cache.getText("lang_strings");
            this.gameTextsParsed = (new DOMParser).parseFromString(a, "text/xml");
            for (var a = this.gameTextsParsed.getElementsByTagName("string"), b = 0; b < a.length; b++) {
                null == this.gameTextsLists[a.item(b).getAttribute("id")] && (this.gameTextsLists[a.item(b).getAttribute("id")] = []);
                for (var c = 0; c < LANGUAGES.length; c++) 0 < a.item(b).getElementsByTagName(LANGUAGES[c]).length &&
                    (this.gameTextsLists[a.item(b).getAttribute("id")][LANGUAGES[c]] = a.item(b).getElementsByTagName(LANGUAGES[c])[0].textContent.replace(/\\n/g, "\n"))
            }
        },
        LANGUAGES = "en de es fr it pt ru".split(" ");
    Languages.instance = null;
    Languages.prototype = {};

    function str(a) {
        return void 0 == Languages.instance.gameTextsLists[a] || void 0 == Languages.instance.gameTextsLists[a][Languages.instance.language] ? (LOG("STR(" + a + ") MISSING!"), "NAN") : Languages.instance.gameTextsLists[a][Languages.instance.language].replaceAll("\\n", "\n")
    }

    function STR(a) {
        return str(a).toUpperCase()
    }

    function extractUniqueChars(a, b) {
        for (var c = 0; c < a.length; c++) 0 > b.indexOf(a[c]) && b.push(a[c])
    };
    var partnerName = "gamedistribution";

    function analyticsOnMainMenuLoadEvent() {}
    var firstRun = !0;

    function analyticsOnLevelStartEvent() {
        firstRun = !1
    };
    var ORIENTATION_PORTRAIT = 0,
        ORIENTATION_LANDSCAPE = 1,
        GAME_CURRENT_ORIENTATION = ORIENTATION_PORTRAIT,
        game_resolution = {
            xMin: 460,
            xMax: 600,
            y: 800
        };
    var SOUNDS_ENABLED = !0,
        RUNNING_ON_WP = -1 < navigator.userAgent.indexOf("Windows Phone");
    RUNNING_ON_WP && (SOUNDS_ENABLED = !1);
    Phaser.Device._initialize();
    var RUNNING_ON_DESKTOP = Phaser.Device.desktop,
        RUNNING_ON_IOS = !1,
        userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) RUNNING_ON_IOS = !0;
    var ANIMATION_CUBIC_IO = Phaser.Easing.Cubic.InOut,
        tmp_sprites = [];

    function getRandomUInt(a) {
        return Math.floor(Math.random() * a)
    }

    function getRandomInt(a) {
        return Math.floor(Math.random() * a) * (50 < getRandomUInt(100) ? -1 : 1)
    }

    function getRandomUIntInRange(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a
    }

    function getRandomIntInRange(a, b) {
        return getRandomUIntInRange(a, b) * (50 < getRandomUInt(100)) ? -1 : 1
    }
    String.prototype.replaceAll = function(a, b) {
        return this.split(a).join(b)
    };

    function isNumeric(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }

    function cloneObject(a) {
        if (null == a || "object" != typeof a) return a;
        var b = a.constructor(),
            c;
        for (c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b
    }

    function isUpperCase(a) {
        return a == a.toUpperCase()
    }

    function isLowerCase(a) {
        return a == a.toLowerCase()
    }

    function LOG(a) {}(function() {
        console.dump = function(a) {}
    })();
    Array.prototype.contains = function(a) {
        for (var b = this.length; b--;)
            if (this[b] === a) return !0;
        return !1
    };

    function shuffleArray(a) {
        for (var b = a.length, c, d; 0 !== b;) d = Math.floor(Math.random() * b), --b, c = a[b], a[b] = a[d], a[d] = c;
        return a
    }

    function getCorrectAnchorX(a, b) {
        return Math.round(a.width * b) / a.width
    }

    function getCorrectAnchorY(a, b) {
        return Math.round(a.height * b) / a.height
    }

    function getAndroidVersion(a) {
        a = (a || navigator.userAgent).toLowerCase();
        return (a = a.match(/android\s([0-9\.]*)/)) ? a[1] : !1
    }

    function updateTextToHeight(a, b, c, d) {
        for (a.style.font = b + 'px "' + c + '"'; a.height > d;) b--, c = a.style, c.font = b + "px gameFont", a.setStyle(c)
    }

    function updateTextToWidth(a, b, c, d) {
        for (a.style.font = b + 'px "' + c + '"'; a.width > d;) {
            b--;
            var e = a.style;
            e.font = b + 'px "' + c + '"';
            a.setStyle(e)
        }
    }

    function updateBitmapTextToWidth(a, b, c) {
        a.fontSize = b;
        for (a.updateText(); a.textWidth > c;) b--, a.fontSize = b, a.updateText()
    }

    function updateBitmapTextToHeight(a, b, c) {
        a.fontSize = b;
        for (a.updateText(); a.textHeight > c;) b--, a.fontSize = b, a.updateText()
    }

    function CreateBoardSpr(a, b, c, d, e, f, g, l, h, n) {
        void 0 === g && (g = 0);
        void 0 === l && (l = 0);
        void 0 === h && (h = c);
        void 0 === n && (n = d);
        tmp_sprites.contains(e) || (tmp_sprites[e] = game.make.sprite(-1E4, -1E4, e));
        _width = c;
        _height = d;
        var m, k;
        m = getSpriteFrameWithinAtlas(tmp_sprites[e], f, 0).width;
        k = getSpriteFrameWithinAtlas(tmp_sprites[e], f, 0).height;
        c = Math.floor(c / m + .5) * m;
        d = Math.floor(d / k + .5) * k;
        var q = game.make.bitmapData(c, d);
        q.smoothed = !1;
        var p = c / m - 2,
            t = d / k - 2;
        c = 0 + c;
        q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 0), 0, 0);
        for (var r = 0; r < p; r++) q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 1), 0 + m * (r + 1), 0);
        q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 2), c - m, 0);
        for (var u = 0; u < t; u++)
            for (q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 3), 0, 0 + k * (u + 1)), q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 5), c - m, 0 + k * (u + 1)), r = 0; r < p; r++) q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 4), 0 + m * (r + 1), 0 + k * (u + 1));
        q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 6), 0, 0 + d - k);
        for (r = 0; r < p; r++) q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e],
            f, 7), 0 + m * (r + 1), 0 + d - k);
        q.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 8), c - m, 0 + d - k);
        f = makeSprite(0, 0, "pak2", "void.png");
        d = game.rnd.uuid();
        q.generateTexture(d, function(a) {
            LOG("bmpData.generateTexture");
            this.sprite.loadTexture(a);
            this.sprite.scale.set(1);
            this.sprite.width = this.scaledW;
            this.sprite.height = this.scaledH;
            this.sprite.anchor.setTo(this.anchorX, this.anchorY)
        }, {
            sprite: f,
            anchorX: g,
            anchorY: l,
            scaledW: h,
            scaledH: n
        });
        f.x = a;
        f.y = b;
        q.destroy();
        q = null;
        return f
    }

    function CreateDialogSpr(a, b, c, d, e, f, g, l, h, n) {
        var m, k;
        void 0 === g && (g = 0);
        void 0 === l && (l = 0);
        void 0 === h && (h = c);
        void 0 === n && (n = d);
        tmp_sprites.contains(e) || (tmp_sprites[e] = game.make.sprite(-1E4, -1E4, e));
        m = getSpriteFrameWithinAtlas(tmp_sprites[e], f, 0).width;
        k = getSpriteFrameWithinAtlas(tmp_sprites[e], f, 0).height;
        c = game.make.bitmapData(c, d);
        c.smoothed = !1;
        c.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 0), 0, 0);
        c.draw(getSpriteFrameWithinAtlas(tmp_sprites[e], f, 1), 0, 0 + k, m, d - 2 * k);
        c.draw(getSpriteFrameWithinAtlas(tmp_sprites[e],
            f, 2), 0, 0 + d - k);
        f = makeSprite(0, 0, "pak2", "void.png");
        d = game.rnd.uuid();
        c.generateTexture(d, function(a) {
            LOG("bmpData.generateTexture");
            this.sprite.loadTexture(a);
            this.sprite.width = this.scaledW;
            this.sprite.height = this.scaledH;
            this.sprite.anchor.setTo(this.anchorX, this.anchorY)
        }, {
            sprite: f,
            anchorX: g,
            anchorY: l,
            scaledW: h,
            scaledH: n
        });
        f.x = a;
        f.y = b;
        c.destroy();
        c = null;
        return f
    }

    function CreateButtonSpr(a, b, c, d, e, f, g, l, h) {
        void 0 === f && (f = 0);
        void 0 === g && (g = 0);
        void 0 === l && (l = 1);
        void 0 === h && (h = 1);
        tmp_sprites.contains(d) || (tmp_sprites[d] = game.make.sprite(-1E4, -1E4, d));
        _width = c;
        var n, m;
        n = game.cache.getFrameByName(d, e + "_0.png").width;
        m = game.cache.getFrameByName(d, e + "_0.png").height;
        var k = game.make.bitmapData(c, m);
        k.smoothed = !1;
        var q = c / n - 2,
            p = 0 + c;
        k.draw(getSpriteFrameWithinAtlas(tmp_sprites[d], e, 0), 0, 0);
        for (var t = 0; t < q; t++) k.draw(getSpriteFrameWithinAtlas(tmp_sprites[d], e, 1), 0 + n *
            (t + 1), 0);
        k.draw(getSpriteFrameWithinAtlas(tmp_sprites[d], e, 2), p - n, 0);
        e = makeSprite(0, 0, "pak2", "void.png");
        d = game.rnd.uuid();
        k.generateTexture(d, function(a) {
            this.sprite.loadTexture(a);
            this.sprite.anchor.setTo(this.anchorX, this.anchorY);
            this.sprite.scale.setTo(this.scaleX, this.scaleY)
        }, {
            sprite: e,
            anchorX: f,
            anchorY: g,
            scaleX: l,
            scaleY: h
        });
        e.x = a;
        e.y = b;
        e.width = c * l;
        e.height = m * h;
        k.destroy();
        k = null;
        return e
    }

    function getSpriteFrame(a, b) {
        a.frame = b;
        return a
    }

    function getSpriteFrameWithinAtlas(a, b, c) {
        a.frameName = b + "_" + c + ".png";
        return a
    }

    function makeSprite(a, b, c, d) {
        return c = game.make.sprite(a, b, c, d || 0)
    }

    function addSprite(a, b, c, d) {
        return c = game.add.sprite(a, b, c, d || 0)
    }

    function leadingZero(a, b) {
        for (var c = "" + a; c.length < b;) c = "0" + c;
        return c
    }

    function SetPoingScaleTween(a, b, c, d, e) {
        a.scale.set(1);
        void 0 === c && (c = 150);
        void 0 === d && (d = 0);
        void 0 === e && (e = Phaser.Easing.Quartic.Out);
        game.add.tween(a.scale).to({
            x: b,
            y: b
        }, c, e, !0, d, 0, !0)
    }

    function CreateButtonWithText(a, b, c, d, e, f, g, l, h, n) {
        void 0 === g && (g = null);
        void 0 === l && (l = "#FFFFFF");
        void 0 === h && (h = "#000000");
        void 0 === n && (n = 25);
        c = a.create(c, d, "pak2", e);
        c.anchor.set(.5);
        b.addChild(c);
        null != g && (a = a.create(0, 0, "pak2", g), a.anchor.set(.5), c.addChild(a), c.btnHighlighted = a, a.visible = !1);
        f = game.add.text(1, 0, f, {
            font: n + "px gameFont",
            fill: l
        });
        f.anchor.setTo(.5, .5);
        f.shadowOffsetX = 2;
        f.shadowOffsetY = 2;
        f.shadowColor = h;
        f.shadowFill = h;
        c.addChild(f);
        c.txtCaption = f;
        return c
    }

    function SetTextColor(a, b, c) {
        a.tint = b
    }

    function wiggle(a, b, c) {
        c = a * (2 * Math.PI * c + Math.PI / 2);
        return Math.sin(a * Math.PI * 2 * b) * Math.cos(c)
    }
    var tmpLine = new Phaser.Line(0, 0, 0, 0),
        tmpLineNormal1 = new Phaser.Line(0, 0, 0, 0),
        tmpLineNormal2 = new Phaser.Line(0, 0, 0, 0),
        tmpCircle1 = new Phaser.Circle(0, 0, 10),
        tmpCircle2 = new Phaser.Circle(0, 0, 10);

    function MoveSpriteBezier(a, b, c, d, e, f, g, l) {
        void 0 === g && (g = function() {});
        var h = null;
        tmpLine.start.x = a.position.x;
        tmpLine.start.y = a.position.y;
        tmpLine.end.x = b;
        tmpLine.end.y = c;
        h = tmpLine.coordinatesOnLine(Math.floor(tmpLine.length / 5 + .5));
        LOG("coords.lenght = " + h.length);
        5 > h.length && (h[4] = [], h[4][0] = h[3][0], h[4][1] = h[3][1]);
        tmpLineNormal1.fromAngle(h[1][0], h[1][1], tmpLine.normalAngle, (Math.floor(tmpLine.length / 4) + getRandomInt(10)) * f);
        tmpLineNormal2.fromAngle(h[4][0], h[4][1], tmpLine.normalAngle, (Math.floor(tmpLine.length /
            8) + getRandomInt(20)) * f);
        tmpCircle1.x = tmpLineNormal1.end.x;
        tmpCircle1.y = tmpLineNormal1.end.y;
        tmpCircle2.x = tmpLineNormal2.end.x;
        tmpCircle2.y = tmpLineNormal2.end.y;
        f = [];
        f[0] = {
            x: a.position.x,
            y: a.position.y
        };
        f[1] = {
            x: tmpLineNormal1.end.x,
            y: tmpLineNormal1.end.y
        };
        f[2] = {
            x: tmpLineNormal2.end.x,
            y: tmpLineNormal2.end.y
        };
        f[3] = {
            x: b,
            y: c
        };
        h = game.add.tween(a.position).to({
            x: [f[0].x, f[1].x, f[2].x, f[3].x],
            y: [f[0].y, f[1].y, f[2].y, f[3].y]
        }, d, Phaser.Easing.Quadratic.InOut, !0, e, 0).interpolation(function(a, b) {
            return Phaser.Math.bezierInterpolation(a,
                b)
        });
        a.twnMove = h;
        null != g && h.onComplete.add(g, l)
    }

    function createIngameText(a, b, c, d) {
        a = new Phaser.Text(game, a, b, c, {
            fill: "#FFFFFF",
            font: (d || "25") + "px gameFont"
        });
        a.anchor.x = getCorrectAnchorX(a, .5);
        a.anchor.y = getCorrectAnchorY(a, .5);
        a.shadowOffsetX = 3;
        a.shadowOffsetY = 3;
        a.shadowColor = "#660000";
        return a
    }

    function createResultText(a, b, c, d) {
        a = new Phaser.Text(game, a, b, c, {
            fill: "#ffffff",
            font: (d || "25") + "px gameFont"
        });
        a.anchor.x = getCorrectAnchorX(a, .5);
        a.anchor.y = getCorrectAnchorY(a, .5);
        a.shadowOffsetX = 2;
        a.shadowOffsetY = 2;
        a.shadowColor = "#5b2121";
        a.shadowFill = "#5b2121";
        return a
    }

    function createButtonWithIcon(a, b, c, d, e) {
        a = a.create(b, c, "pak2", "button_0.png");
        a.anchor.set(.5);
        a.inputEnabled = !0;
        AddButtonEvents(a, e, ButtonOnInputOver, ButtonOnInputOut);
        d = new Phaser.Sprite(game, 0, -3, "pak2", "icons_" + d + ".png");
        d.anchor.set(.5);
        a.addChild(d);
        return a
    }

    function createInstructionsText(a, b, c, d) {
        a = new Phaser.Text(game, a, b, c, {
            fill: "#FFFFFF",
            font: "24px gameFont",
            wordWrap: !0,
            wordWrapWidth: d,
            align: "center"
        });
        a.anchor.x = getCorrectAnchorX(a, .5);
        a.anchor.y = getCorrectAnchorY(a, .5);
        a.shadowOffsetX = 2;
        a.shadowOffsetY = 2;
        a.shadowColor = "#555555";
        a.shadowFill = "#555555";
        return a
    }

    function tweenTint(a, b, c, d) {
        var e = {
            step: 0
        };
        d = game.add.tween(e).to({
            step: 100
        }, d);
        d.onUpdateCallback(function() {
            a.tint = Phaser.Color.interpolateColor(b, c, 100, e.step)
        });
        a.tint = b;
        d.start()
    }

    function tweenBackgroundColor(a, b, c, d, e, f) {
        var g = {
            step: 0
        };
        f = game.add.tween(g).to({
            step: 10
        }, f);
        f.onUpdateCallback(function() {
            a.backgroundColor = Phaser.Color.interpolateColorWithRGB(b, c, d, e, 10, g.step)
        });
        a.backgroundColor = b;
        f.start()
    }

    function gameTimeDelta() {
        game.time.advancedTiming = !0;
        var a = 1 / game.time.desiredFps / slowTimeFactor;
        isNumeric(a) || (a = 1 / 60 / slowTimeFactor);
        return a
    }

    function createShadowedBitmapText(a, b, c, d, e, f, g) {
        void 0 === e && (e = 0);
        void 0 === f && (f = 0);
        void 0 === g && (g = "left");
        a = game.add.sprite(a, b, "pak2", "void.png");
        a.anchor.setTo(e, f);
        b = game.add.bitmapText(0, 2, "gamefont_TA", d, c);
        b.align = g;
        b.anchor.setTo(e, f);
        b.tint = 0;
        c = game.add.bitmapText(0, 0, "gamefont_TA", d, c);
        c.align = g;
        c.anchor.setTo(e, f);
        c.tint = 16777215;
        a.addChild(b);
        a.addChild(c);
        a.textShadow = b;
        a.textTop = c;
        return a
    }

    function setShadowBitmapText(a, b, c) {
        void 0 === c && (c = !1);
        a.textShadow.font = "gamefont_TA";
        a.textTop.font = "gamefont_TA";
        c && "ru" == language && (a.textShadow.font = "gamefont_RU", a.textTop.font = "gamefont_RU");
        a.textShadow.text = b;
        a.textTop.text = b
    };
    var IMAGE_FOLDER = "images/";

    function loadSplash(a) {
        a.load.text("lang_strings", "lang.xml");
        a.load.image("inlogic_logo", "" + IMAGE_FOLDER + "inl.png");
        a.load.image("void", "" + IMAGE_FOLDER + "void.png")
    }

    function loadImages(a) {
        a.load.xml("gamefont_TA_xml", "fnt/gamefont_TA.xml");
        a.load.xml("gamefont_RU_xml", "fnt/gamefont_RU.xml");
        a.load.atlas("pak2", "" + IMAGE_FOLDER + "pak2.png", "" + IMAGE_FOLDER + "pak2.json")
    }

    function loadSounds(a) {
        a.load.audio("music_menu", ["audio/music_menu.ogg", "audio/music_menu.mp3"]);
        a.load.audio("music_game", ["audio/music_game.ogg", "audio/music_game.mp3"]);
        a.load.audio("exceptional_text", ["audio/exceptional_text.ogg", "audio/exceptional_text.mp3"]);
        a.load.audio("result_gold-star", ["audio/result_gold-star.ogg", "audio/result_gold-star.mp3"]);
        a.load.audio("result_bronze-silver-star", ["audio/result_bronze-silver-star.ogg",
            "audio/result_bronze-silver-star.mp3"
        ]);
        a.load.audio("menu-click1", ["audio/menu-click1.ogg", "audio/menu-click1.mp3"]);
        a.load.audio("menu-negative1", ["audio/menu-negative1.ogg", "audio/menu-negative1.mp3"]);
        a.load.audio("result_item_appear", ["audio/result_item_appear.ogg", "audio/result_item_appear.mp3"]);
        a.load.audio("cnt", ["audio/cnt.ogg", "audio/cnt.mp3"]);
        a.load.audio("bounce", ["audio/bounce.ogg", "audio/bounce.mp3"]);
        a.load.audio("laser2", ["audio/laser2.ogg", "audio/laser2.mp3"]);
        a.load.audio("playerHit", ["audio/playerHit.ogg", "audio/playerHit.mp3"]);
        a.load.audio("expl1", ["audio/expl1.ogg", "audio/expl1.mp3"]);
        a.load.audio("expl2", ["audio/expl2.ogg", "audio/expl2.mp3"]);
        a.load.audio("expl3", ["audio/expl3.ogg", "audio/expl3.mp3"]);
        a.load.audio("expl4", ["audio/expl4.ogg", "audio/expl4.mp3"]);
        a.load.audio("laser", ["audio/laser.ogg", "audio/laser.mp3"]);
        a.load.audio("rocket", ["audio/rocket.ogg", "audio/rocket.mp3"]);
        a.load.audio("coin", ["audio/coin.ogg", "audio/coin.mp3"]);
        a.load.audio("kaching", ["audio/kaching.ogg", "audio/kaching.mp3"]);
        a.load.audio("powerwall", ["audio/powerwall.ogg", "audio/powerwall.mp3"])
    }

    function getPakFrames(a, b) {
        output = [];
        for (var c = 0; c < b.length; c++) output[c] = a + b[c] + ".png";
        return output
    };
    var Splash = function(a) {};

    function enterIncorrectOrientation() {
        LOG("enterIncorrectOrientation()");
        showDiv("wrongRotation");
        hideDiv("gameCanvas");
        if (!game.device.desktop && null != gameState) gameState.onGamePause()
    }

    function leaveIncorrectOrientation() {
        LOG("leaveIncorrectOrientation()");
        hideDiv("wrongRotation");
        showDiv("gameCanvas");
        if (!game.device.desktop && null != gameState) gameState.onGameResume()
    }
    Splash.prototype = {
        preload: function() {
            this.game.stage.backgroundColor = 0;
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = !0;
            game.scale.pageAlignVertically = !0;
            game.scale.refresh();
            game.canvas.id = "gameCanvas";
            window.addEventListener("resize", function() {
                onGameResize()
            });
            onGameResize();
            loadSplash(this.game)
        },
        create: function() {
            this.game.state.start("PreloadState")
        }
    };
    var savedClientWidth = 0,
        savedClientHeight = 0;

    function onGameResize() {
        LOG("onGameResize()");
        if (null !== game) {
            var a = document.documentElement.clientWidth,
                b = document.documentElement.clientHeight;
            isIOS && a > b && (a = window.innerWidth, b = window.innerHeight);
            b > a ? (leaveIncorrectOrientation(), GAME_CURRENT_ORIENTATION = ORIENTATION_PORTRAIT, resolutionY = game_resolution.y, resolutionX = a / b * resolutionY, isNaN(resolutionX) && (resolutionX = 0), resolutionX < game_resolution.xMin && (resolutionX = game_resolution.xMin), resolutionX > game_resolution.xMax && (resolutionX = game_resolution.xMax)) :
                enterIncorrectOrientation();
            savedClientWidth = a;
            savedClientHeight = b;
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = !0;
            game.scale.pageAlignVertically = !0;
            game.scale.refresh();
            game.scale.setGameSize(resolutionX, resolutionY);
            if (null != gameState) gameState.onResolutionChange();
            if (null != preloadState) preloadState.onResolutionChange()
        }
    };
    var Preloader = function(a) {},
        loaderPosY, preloadState;
    Preloader.prototype = {
        preload: function() {
            sceneLanguages = null;
            startTime = Date.now();
            this.game.stage.backgroundColor = 0;
            preloadState = this;
            loaderPosY = this.game.world.height / 5 * 4.5;
            imgSplash = this.game.add.sprite(game.width / 2, game.height / 2, "inlogic_logo");
            imgSplash.anchor.x = .5;
            imgSplash.anchor.y = .5;
            imgBtn = this.game.add.sprite(game.width / 2, game.height / 2, "void");
            imgBtn.anchor.set(.5);
            imgBtn.scale.x = game.width / 100 + .2;
            imgBtn.scale.y = game.height / 100 + .2;
            new Languages;
            percentageText = this.game.add.text(this.game.world.centerX,
                this.game.height - 20, "0 %", {
                    font: '35px "Arial Black"',
                    fill: "#FFFFFF"
                });
            percentageText.anchor.set(.5);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            loadImages(this.game);
            SOUNDS_ENABLED && loadSounds(this.game);
            this.loadLanguageSettings();
            window.addEventListener("resize", function() {})
        },
        fileComplete: function(a, b, c, d, e) {
            percentageText.text = a + " %";
            100 <= a && this._create()
        },
        _create: function() {
            imgBtn.inputEnabled = !0;
            imgBtn.events.onInputDown.add(this.inputListener, this);
            game.add.tween(percentageText).to({
                    alpha: 0
                },
                1.4 * ScenesTransitions.TRANSITION_LENGTH, "Linear", !0, 3 * ScenesTransitions.TRANSITION_LENGTH, -1, !0);
            var a = Date.now() - startTime;
            /*2E3 > a ? game.time.events.add(2E3 - a, function() {
                this.startGame()
            }, this) : this.startGame();*/
			this.startGame();
        },
        createMenuText: function(a, b, c) {
            a = new Phaser.Text(game, a, b, c, {
                fill: "#FED87F"
            });
            a.anchor.x = getCorrectAnchorX(a, .5);
            a.anchor.y = getCorrectAnchorY(a, .5);
            a.shadowOffsetX = 3;
            a.shadowOffsetY = 3;
            a.shadowColor = "#660000";
            return a
        },
        loadLanguageSettings: function() {
            Languages.instance.language = "en";
            var a = navigator.userLanguage ||
                navigator.language;
            0 == a.indexOf("fr") && (Languages.instance.language = "fr");
            0 == a.indexOf("it") && (Languages.instance.language = "it");
            0 == a.indexOf("de") && (Languages.instance.language = "de");
            0 == a.indexOf("es") && (Languages.instance.language = "es");
            0 == a.indexOf("pt") && (Languages.instance.language = "pt");
            0 == a.indexOf("ru") && (Languages.instance.language = "ru");
			language = Languages.instance.language;
        },
        inputListener: function() {
            this.startGame()
        },
        startGame: function() {
			null == sceneLanguages && (imgBtn.inputEnabled = !1, imgBtn.events.onInputDown.dispose(), this.game.world.remove(imgSplash),
                this.game.world.remove(imgBtn), ScenesTransitions.hideSceneAlpha(percentageText), sceneLanguages = new SceneLanguages, sceneLanguages.ShowAnimated(), this.loadLanguageSettings(), 
            sceneLanguages.OnLanguageSelected())
        },
        onResolutionChange: function() {
            loaderPosY = this.game.world.height / 5 * 4.5;
            imgSplash.reset(game.width / 2, game.height / 2);
            imgBtn.reset(game.width / 2, game.height / 2);
            imgBtn.scale.x = game.width / 100 + .2;
            imgBtn.scale.y = game.height / 100 + .2;
            percentageText.reset(this.game.world.centerX, this.game.height - 20);
            if (void 0 !== sceneLanguages && null != sceneLanguages) sceneLanguages.onResolutionChange()
        }
    };
    var GameData = function() {};

    SHOP_ARMOR = 0;
    SHOP_GUNS = 1;
    SHOP_EXTRA_GUNS = 2;
    SHOP_MAGNET = 3;
    SHOP_NITRO = 4;
    SHOP_LASER = 5;
    PlayerLevel = 1;
    BoostersUsed = PoliceDestroyed = CarsDestroyed = PlayerRecord = PlayerTotalMtrs = PlayerCash = 0;
    ShopUpgrades = [];
    CarQuests = [];
    CarPrice = [];
    GameData.Reset = function() {
        PlayerLevel = 1;
        BoostersUsed = PoliceDestroyed = CarsDestroyed = PlayerRecord = PlayerTotalMtrs = PlayerCash = 0;
        for (var a = 1; 3 >= a; a++) ShopUpgrades[a] = [], CarQuests[a] = [], ShopUpgrades[a][SHOP_ARMOR] = 0, ShopUpgrades[a][SHOP_GUNS] = 0, ShopUpgrades[a][SHOP_EXTRA_GUNS] = 0, ShopUpgrades[a][SHOP_MAGNET] = 0, ShopUpgrades[a][SHOP_NITRO] = 0, ShopUpgrades[a][SHOP_LASER] = 0;
        CarPrice[1] = 0;
        CarPrice[2] = 1E3;
        CarPrice[3] = 2E3;
        CarQuests[2].push({
            getText: function() {
                return str("QUEST2_0")
            },
            getProgress: function() {
                var a =
                    PlayerLevel;
                a > this.getMax() && (a = this.getMax());
                return a
            },
            getMax: function() {
                return 5
            }
        });
        CarQuests[2].push({
            getText: function() {
                return str("QUEST2_1")
            },
            getProgress: function() {
                var a = (PlayerTotalMtrs / 1E3).toFixed(2);
                a > this.getMax() && (a = this.getMax());
                return a
            },
            getMax: function() {
                return 150
            }
        });
        CarQuests[2].push({
            getText: function() {
                return str("QUEST2_2")
            },
            getProgress: function() {
                var a = CarsDestroyed;
                a > this.getMax() && (a = this.getMax());
                return a
            },
            getMax: function() {
                return 1500
            }
        });
        CarQuests[3].push({
            getText: function() {
                return str("QUEST3_0")
            },
            getProgress: function() {
                var a = PlayerLevel;
                a > this.getMax() && (a = this.getMax());
                return a
            },
            getMax: function() {
                return 10
            }
        });
        CarQuests[3].push({
            getText: function() {
                return str("QUEST3_1")
            },
            getProgress: function() {
                var a = BoostersUsed;
                a > this.getMax() && (a = this.getMax());
                return a
            },
            getMax: function() {
                return 500
            }
        });
        CarQuests[3].push({
            getText: function() {
                return str("QUEST3_2")
            },
            getProgress: function() {
                var a = PoliceDestroyed;
                a > this.getMax() && (a = this.getMax());
                return a
            },
            getMax: function() {
                return 100
            }
        })
    };
    GameData.Load = function() {
        GameData.Reset();
        var a = null;
        try {
            a = JSON.parse(localStorage.getItem(GameData.ProfileName)), ShopUpgrades = a.ShopUpgrades, PlayerLevel = a.PlayerLevel, PlayerCash = a.PlayerCash, PlayerRecord = a.PlayerRecord, PlayerTotalMtrs = a.PlayerTotalMtrs, CarsDestroyed = a.CarsDestroyed, CarPrice = a.CarPrice, PoliceDestroyed = a.PoliceDestroyed, BoostersUsed = a.BoostersUsed, void 0 === CarPrice && (CarPrice = [, 0, 1E3, 2E3])
        } catch (b) {}
    };
    GameData.Save = function() {
        var a = {};
        a.ShopUpgrades = ShopUpgrades;
        a.PlayerLevel = PlayerLevel;
        a.PlayerCash = PlayerCash;
        a.PlayerRecord = PlayerRecord;
        a.PlayerTotalMtrs = PlayerTotalMtrs;
        a.CarsDestroyed = CarsDestroyed;
        a.CarPrice = CarPrice;
        a.PoliceDestroyed = PoliceDestroyed;
        a.BoostersUsed = BoostersUsed;
        try {
            localStorage.setItem(GameData.ProfileName, JSON.stringify(a))
        } catch (b) {}
    };

    function AddButtonEvents(a, b, c, d, e) {
        void 0 === e && (e = null);
        void 0 === c && (c = ButtonOnInputOver);
        void 0 === d && (d = ButtonOnInputOut);
        a.inputEnabled = !0;
        a.buttonPressed = !1;
        a.onInputOut = d;
        a.onInputUp = e;
        a.events.onInputDown.add(ButtonOnInputDown, {
            button: a,
            callback: b
        });
        a.events.onInputOver.add(c, {
            button: a
        });
        a.events.onInputOut.add(d, {
            button: a
        });
        null != e && a.events.onInputUp.add(e, {
            button: a
        })
    }

    function ButtonOnInputDown() {
        ScenesTransitions.transitionActive || (this.button.hasOwnProperty("spriteHighlighted") && (this.button.spriteHighlighted.tint = 16777215), this.button.tint = 16777215, this.callback(), this.button.onInputOut(this.button), this.button.buttonPressed = !0, this.button.buttonPressedTime = game.time.totalElapsedSeconds())
    }

    function ButtonOnInputOver(a) {
        a = a || this.button;
        Phaser.Device.desktop && (void 0 === a.overFrame ? (a.hasOwnProperty("spriteHighlighted") && (a.spriteHighlighted.tint = 10066329), a.tint = 10066329) : a.frameName = a.overFrame, a.cachedTint = -1)
    }

    function ButtonOnInputOut(a) {
        a = a || this.button;
        if (Phaser.Device.desktop && (void 0 === a.outFrame ? (a.hasOwnProperty("spriteHighlighted") && (a.spriteHighlighted.tint = 16777215), a.tint = 16777215) : a.frameName = a.outFrame, a.cachedTint = -1, a.buttonPressed && (a.buttonPressed = !1, null != a.onInputUp))) a.onInputUp(a)
    };
    var ScenesTransitions = function() {};
    ScenesTransitions.TRANSITION_LENGTH = 200;
    ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Linear.In;
    ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out;
    ScenesTransitions.transitionActive = !1;
    ScenesTransitions.transitionStarted = function() {
        ScenesTransitions.transitionActive = !0
    };
    ScenesTransitions.transitionFinished = function() {
        ScenesTransitions.transitionActive = !1
    };
    ScenesTransitions.shakeScene = function(a, b, c, d, e, f) {
        void 0 === b && (b = 3);
        void 0 === c && (c = 0);
        void 0 === d && (d = ScenesTransitions.TRANSITION_LENGTH);
        void 0 === e && (e = null);
        void 0 === f && (f = null);
        game.tweens.removeFrom(a, !0);
        var g = game.add.tween(a.position);
        a.position.orgX = a.position.x;
        a.position.orgY = a.position.y;
        a.position.shakeAmount = b;
        g.to({
            x: a.position.x,
            y: a.position.y
        }, d, Phaser.Easing.Cubic.InOut, !0, c);
        g.onUpdateCallback(function(a, b, c) {
            a.target.x = a.target.orgX + getRandomInt(a.target.shakeAmount);
            a.target.y =
                a.target.orgY + getRandomInt(a.target.shakeAmount);
            null != this.callbackOnUpdate && this.callbackOnUpdate(b)
        }, {
            callbackOnUpdate: f
        });
        g.onComplete.add(function() {
            this.scene.position.x = this.scene.position.orgX;
            this.scene.position.y = this.scene.position.orgY;
            null != this.callbackOnComplete && this.callbackOnComplete()
        }, {
            scene: a,
            callbackOnComplete: e
        });
        return g
    };
    ScenesTransitions.showSceneAlpha = function(a, b, c, d, e) {
        void 0 === b && (b = 0);
        void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH / 2);
        void 0 === d && (d = null);
        void 0 === e && (e = 1);
        game.tweens.removeFrom(a, !1);
        a.visible = !0;
        a.alpha = 0;
        b = game.add.tween(a).to({
            alpha: e
        }, c, ScenesTransitions.TRANSITION_EFFECT_IN, !1, b);
        b.onComplete.add(ScenesTransitions.onSceneShown, {
            shownScene: a,
            callback: d
        });
        b.start();
        a.showTween = b
    };
    ScenesTransitions.showSceneH = function(a, b, c, d, e) {
        void 0 === d && (d = ScenesTransitions.TRANSITION_LENGTH);
        void 0 === e && (e = null);
        game.tweens.removeFrom(a, !0);
        a.visible = !0;
        a.x = game.width * (b ? -2 : 2);
        a.y = 0;
        showTween = game.add.tween(a).to({
            x: 0
        }, d, ScenesTransitions.TRANSITION_EFFECT_IN, !1);
        showTween.onComplete.add(ScenesTransitions.onSceneShown, {
            shownScene: a,
            callback: e
        });
        showTween.start();
        a.showTween = showTween
    };
    ScenesTransitions.showSceneFromLeft = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
        void 0 === d && (d = null);
        return ScenesTransitions.showSceneH(a, !0, b, c, d)
    };
    ScenesTransitions.showSceneV = function(a, b, c, d, e) {
        void 0 === c && (c = 0);
        void 0 === d && (d = ScenesTransitions.TRANSITION_LENGTH);
        void 0 === e && (e = null);
        game.tweens.removeFrom(a, !0);
        a.visible = !0;
        a.x = 0;
        a.y = game.height * (b ? -2 : 2);
        showTween = game.add.tween(a).to({
            y: 0
        }, d, ScenesTransitions.TRANSITION_EFFECT_IN, !1, c);
        showTween.onComplete.add(ScenesTransitions.onSceneShown, {
            shownScene: a,
            callback: e
        });
        showTween.start();
        a.showTween = showTween
    };
    ScenesTransitions.showSceneFromTop = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
        void 0 === d && (d = null);
        ScenesTransitions.showSceneV(a, !0, b, c, d)
    };
    ScenesTransitions.showSceneFromBottom = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
        void 0 === d && (d = null);
        return ScenesTransitions.showSceneV(a, !1, b, c, d)
    };
    ScenesTransitions.showSceneFromRight = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
        void 0 === d && (d = null);
        return ScenesTransitions.showSceneH(a, !1, b, c, d)
    };
    ScenesTransitions.hideSceneAlpha = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH / 2);
        void 0 === d && (d = null);
        game.tweens.removeFrom(a, !0);
        var e = game.add.tween(a);
        e.to({
            alpha: 0
        }, c, ScenesTransitions.TRANSITION_EFFECT_OUT, !1, b);
        e.onComplete.add(ScenesTransitions.onSceneHidden, {
            hiddenScene: a,
            callback: d
        });
        e.start();
        return a.hideTween = e
    };
    ScenesTransitions.hideSceneH = function(a, b, c, d, e) {
        void 0 === c && (c = 0);
        void 0 === e && (e = null);
        game.tweens.removeFrom(a, !0);
        d = game.add.tween(a);
        d.to({
            x: game.width * (b ? -2 : 2)
        }, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_EFFECT_OUT, c);
        d.onComplete.add(ScenesTransitions.onSceneHidden, {
            hiddenScene: a,
            callback: e
        });
        d.start();
        return a.hideTween = d
    };
    ScenesTransitions.hideSceneToLeft = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
        void 0 === d && (d = null);
        return ScenesTransitions.hideSceneH(a, !0, b, c, d)
    };
    ScenesTransitions.hideSceneToRight = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
        void 0 === d && (d = null);
        return ScenesTransitions.hideSceneH(a, !1, b, c, d)
    };
    ScenesTransitions.hideSceneV = function(a, b, c, d, e) {
        void 0 === e && (e = null);
        game.tweens.removeFrom(a, !0);
        c = game.add.tween(a);
        c.to({
            y: game.height * (b ? -2 : 2)
        }, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_EFFECT_OUT);
        c.onComplete.add(ScenesTransitions.onSceneHidden, {
            hiddenScene: a,
            callback: e
        });
        c.start();
        return a.hideTween = c
    };
    ScenesTransitions.hideSceneToTop = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
        void 0 === d && (d = null);
        return ScenesTransitions.hideSceneV(a, !0, b, c, d)
    };
    ScenesTransitions.hideSceneToBottom = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH);
        void 0 === d && (d = null);
        return ScenesTransitions.hideSceneV(a, !1, b, c, d)
    };
    ScenesTransitions.onSceneHidden = function() {
        LOG("onSceneHidden : " + this.hiddenScene.name);
        this.hiddenScene.visible = !1;
        null != this.callback && this.callback()
    };
    ScenesTransitions.onSceneShown = function() {
        LOG("onSceneShown: " + this.shownScene.name);
        null != this.callback && this.callback()
    };
    ScenesTransitions.showSceneScale = function(a, b, c, d, e, f) {
        void 0 === b && (b = 0);
        void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH / 2);
        void 0 === d && (d = null);
        void 0 === e && (e = ScenesTransitions.TRANSITION_EFFECT_IN);
        void 0 === f && (f = 1);
        a.scale.set(0);
        a.visible = !0;
        b = game.add.tween(a.scale).to({
            x: f,
            y: f
        }, c, e, !1, b);
        b.onComplete.add(ScenesTransitions.onSceneShown, {
            shownScene: a,
            callback: d
        });
        b.start();
        a.showTween = b
    };
    ScenesTransitions.hideSceneScale = function(a, b, c, d, e) {
        void 0 === b && (b = 0);
        void 0 === c && (c = ScenesTransitions.TRANSITION_LENGTH / 2);
        void 0 === d && (d = null);
        void 0 === e && (e = ScenesTransitions.TRANSITION_EFFECT_IN);
        a.visible = !0;
        b = game.add.tween(a.scale).to({
            x: 0,
            y: 0
        }, c, e, !1, b);
        b.onComplete.add(ScenesTransitions.onSceneHidden, {
            hiddenScene: a,
            callback: d
        });
        b.start();
        a.hideTween = b
    };
    MAX_TRAPS = 20;
    MAX_DECORS_TOP = MAX_DECORS_BOTTOM = 5;
    var SceneRoad = function() {
        SceneRoad.instance = this;
        this.create()
    };
    SceneRoad.instance = null;
    SceneRoad.prototype = {
        create: function() {
            grpSceneRoad = game.add.group();
            this.createRoad();
            this.createDecorsBottom();
            this.createTraps();
            grpSceneRoad.visible = !1;
            this.onResolutionChange();
            playerMeters = roadSpeed = 0
        },
        createRoad: function() {
            tileSpriteRoad = game.add.tileSprite(game.width / 2, 0, 600, game.height, "pak2", "bg1.png");
            tileSpriteRoad.anchor.x = .5;
            grpSceneRoad.add(tileSpriteRoad);
            roadSpriteIdx = 1;
            imgGameBlink = grpSceneRoad.create(game.width >> 1, game.height >> 1, "pak2", "blankw.png");
            imgGameBlink.alpha = 0;
            imgGameBlink.anchor.set(.5);
            imgGameBlink.width = game.width;
            imgGameBlink.height = game.height
        },
        changeRoadSprite: function(a) {
            3 < a && (a = 1);
            a != roadSpriteIdx && (roadSpriteIdx = a, a = game.add.tween(tileSpriteRoad).to({
                alpha: 0
            }, 200, ScenesTransitions.TRANSITION_EFFECT_IN, !1), a.onComplete.add(function() {
                tileSpriteRoad.frameName = "bg" + roadSpriteIdx + ".png";
                game.add.tween(tileSpriteRoad).to({
                    alpha: 1
                }, 200, ScenesTransitions.TRANSITION_EFFECT_IN, !0)
            }), a.start())
        },
        updateRoad: function() {
            gamePaused || (dspRoadY = roadSpeed * gameTimeDelta() * nitroMul, tileSpriteRoad.tilePosition.y +=
                dspRoadY, dspCarY = CAR_SPEED * gameTimeDelta() * nitroMul * (roadSpeed < ROAD_SPEED_GAME ? .4 : 1) * CARS_SPEED_MUL, carWaveOffset += dspCarY, gameRunning && (playerMeters += dspRoadY / 20, SceneGUI.instance.setPlayerMetersVal(playerMeters)), tileSpriteRoad.x = (game.width >> 1) / grpSceneRoad.scale.x - (sprPlayerCar.worldPosition.x - (game.width >> 1)) * (600 / game.width - 1), grpSceneGameCars.x = tileSpriteRoad.x, grpScenePlayerCar.x = tileSpriteRoad.x * grpSceneRoad.scale.x)
        },
        createDecorsBottom: function() {
            sprDecorsBottom = [];
            for (var a = 0; a < MAX_DECORS_BOTTOM; a++) {
                var b =
                    grpSceneRoad.create(-1E3, -1E3, "pak2", "bush1.png");
                b.anchor.set(1, .5);
                b.visible = !1;
                sprDecorsBottom.push(b);
                tileSpriteRoad.addChild(b)
            }
        },
        spawnNewDecor: function(a, b, c) {
            var d = this.getFreeDecor(c);
            null != d && (d.anchor.x = c ? .5 : 1, d.reset(c ? 0 : tileSpriteRoad.width >> 1, -CAR_WAVE_HEIGHT - carWaveOffset + b), d.scale.set(c ? 1 : 2), d.decor = a, d.frameName = a + ".png")
        },
        getFreeDecor: function(a) {
            var b = sprDecorsBottom;
            a && (b = sprDecorsTop);
            for (a = b.length - 1; 0 <= a; a--)
                if (!b[a].visible) return b[a];
            return null
        },
        updateDecors: function() {
            if (!gamePaused) {
                for (var a =
                        sprDecorsBottom.length - 1; 0 <= a; a--) {
                    var b = sprDecorsBottom[a];
                    b.visible && (b.y += dspRoadY, b.y > game.height + b.height && (b.visible = !1))
                }
                for (a = sprDecorsTop.length - 1; 0 <= a; a--) b = sprDecorsTop[a], b.visible && (b.bringToTop(), b.y += dspRoadY, b.y > game.height + b.height && (b.visible = !1))
            }
        },
        createTraps: function() {
            sprTraps = [];
            for (var a = 0; a < MAX_TRAPS; a++) {
                var b = grpSceneRoad.create(-1E3, -1E3, "pak2", "hole.png");
                b.animRoadblock = b.animations.add("roadblock", Phaser.Animation.generateFrameNames("road_block_", 0, 2, ".png"), 5, !0);
                b.anchor.set(.5);
                b.visible = !1;
                sprTraps.push(b);
                tileSpriteRoad.addChild(b)
            }
        },
        spawnNewTrap: function(a, b, c, d) {
            var e = this.getFreeTrap();
            null != e && (e.reset(600 * LANES[c], -CAR_WAVE_HEIGHT - carWaveOffset + d), e.lane = c, e.dmg = b, e.trap = a, "roadblock" == a ? e.animations.play("roadblock") : (e.animations.stop(), e.frameName = a + ".png"))
        },
        getFreeTrap: function() {
            for (var a = sprTraps.length - 1; 0 <= a; a--)
                if (!sprTraps[a].visible) return sprTraps[a];
            return null
        },
        updateTraps: function() {
            if (!gamePaused)
                for (var a = sprTraps.length - 1; 0 <= a; a--) {
                    var b = sprTraps[a];
                    b.visible && (b.y += dspRoadY, b.y > game.height + b.height || ScenePlayerCar.instance.isBonusActive(BONUS_NITRO)) && (b.visible = !1)
                }
        },
        getTrapInCollisionWithSprite: function(a) {
            for (var b = sprTraps.length - 1; 0 <= b; b--) {
                var c = sprTraps[b];
                if (c.visible && !(0 >= c.dmg)) {
                    var d = .7 * c.width,
                        e = .7 * c.height;
                    if (!(Math.abs(a.y - c.y) > (a.height + e) / 2 || Math.abs(a.x - c.x) > (a.width + d) / 2)) return c
                }
            }
            return null
        },
        reset: function() {
            for (var a = sprTraps.length - 1; 0 <= a; a--) sprTraps[a].visible = !1
        },
        onResolutionChange: function() {
            imgGameBlink.position.setTo(game.width >>
                1, game.height >> 1);
            imgGameBlink.width = game.width;
            imgGameBlink.height = game.height;
            tileSpriteRoad.x = game.width / 2 / grpSceneRoad.scale.x;
            tileSpriteRoad.height = game.height
        },
        update: function() {
            SceneRoad.instance.updateRoad();
            SceneRoad.instance.updateDecors();
            SceneRoad.instance.updateTraps()
        },
        ShowAnimated: function() {
            ScenesTransitions.transitionStarted();
            ScenesTransitions.showSceneAlpha(grpSceneRoad, 0, 4 * ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.transitionFinished);
            ScenesTransitions.TRANSITION_EFFECT_IN =
                Phaser.Easing.Linear.In
        }
    };
    var SceneLogo = function() {
        SceneLogo.instance = this;
        this.create()
    };
    SceneLogo.instance = null;
    SceneLogo.prototype = {
        create: function() {
            grpSceneLogo = game.add.group();
            imgLogo = game.add.sprite(game.width >> 1, .4 * game.height, "pak2", "logo.png");
            imgLogo.anchor.set(.5);
            grpSceneLogo.add(imgLogo);
            grpSceneLogo.visible = !1;
            this.onResolutionChange()
        },
        onResolutionChange: function() {
            imgLogo.position.setTo(game.width >> 1, .25 * game.height)
        },
        ShowAnimated: function() {
            ScenesTransitions.showSceneAlpha(grpSceneLogo)
        },
        HideAnimated: function() {
            ScenesTransitions.hideSceneAlpha(grpSceneLogo)
        }
    };
    MAX_PROJECTILES = 100;
    CAR_HEALTH_MUL = [.7, .7, 1.4, 3 * .7];
    PLAYER_STEERING_SPEED = 800;
    GUN_DMG = [200, 220, 242, 266, 293, 322, 354, 389, 428, 471, 518];
    PLAYER_HEALTH = [1E3, 1100, 1210, 1331, 1464, 1610, 1771, 1948, 2143, 2357, 2593];
    BONUS_CASH = "bonus_cash.png";
    BONUS_HEALTH = "bonus_health.png";
    BONUS_MAGNET = "bonus_magnet.png";
    BONUS_NITRO = "bonus_nitro.png";
    BONUS_LASER = "bonus_laser.png";
    LASER_DAMAGE = 100;
    var ScenePlayerCar = function() {
        ScenePlayerCar.instance = this;
        this.create()
    };
    ScenePlayerCar.instance = null;
    ScenePlayerCar.prototype = {
        create: function() {
            grpScenePlayerCar = game.add.group();
            this.createPlayer();
            grpScenePlayerCar.visible = !1;
            this.onResolutionChange()
        },
        createPlayer: function() {
            playerFiringDelay = 0;
            sprPlayerCar = grpScenePlayerCar.create(0, game.height + 100, "pak2", "car1.png");
            sprPlayerCar.anchor.set(.5);
            sprPlayerCarHit = grpScenePlayerCar.create(0, 0, "pak2", "car1_hit.png");
            sprPlayerCarHit.anchor.set(.5);
            sprPlayerCarHit.frameDelay = 0;
            sprPlayerCarHit.alpha = 0;
            sprPlayerCar.addChild(sprPlayerCarHit);
            sprPlayerCarShield =
                grpScenePlayerCar.create(0, 0, "pak2", "shield_0.png");
            sprPlayerCarShield.anchor.set(.5);
            sprPlayerCarShield.animations.add("shield", Phaser.Animation.generateFrameNames("shield_", 0, 9, ".png"), 30, !0);
            sprPlayerCarShield.animations.play("shield");
            sprPlayerCarShield.visible = !1;
            sprPlayerCar.addChild(sprPlayerCarShield);
            sprPlayerCar.health = 100;
            sprPlayerCar.healthMax = 100;
            sprPlayerCarGuns = grpScenePlayerCar.create(0, -60, "pak2", "gun2.png");
            sprPlayerCarGuns.anchor.set(.5);
            sprPlayerCarGuns.frameDelay = 0;
            sprPlayerCar.addChild(sprPlayerCarGuns);
            sprPlayerCarExtraGunL = grpScenePlayerCar.create(-20, -10, "pak2", "gun1.png");
            sprPlayerCarExtraGunL.anchor.set(.5);
            sprPlayerCarExtraGunL.frameDelay = 0;
            sprPlayerCarExtraGunL.angle = -15;
            sprPlayerCar.addChild(sprPlayerCarExtraGunL);
            sprPlayerCarExtraGunR = grpScenePlayerCar.create(20, -10, "pak2", "gun1.png");
            sprPlayerCarExtraGunR.anchor.set(.5);
            sprPlayerCarExtraGunR.frameDelay = 0;
            sprPlayerCarExtraGunR.angle = 15;
            sprPlayerCar.addChild(sprPlayerCarExtraGunR);
            sprPlayerCarExplosion = grpScenePlayerCar.create(0, game.height +
                100, "pak2", "explode_0.png");
            sprPlayerCarExplosion.anchor.set(.5);
            sprPlayerCarExplosion.animExplode = sprPlayerCarExplosion.animations.add("explode", Phaser.Animation.generateFrameNames("explode_", 0, 11, ".png"), 30, !1);
            sprPlayerCarExplosion.animExplode.onComplete.add(this.onPlayerCarHasExploded, this);
            activeBonus = [];
            activeBonusTime = [];
            nitroMul = 1
        },
        resetPlayerCar: function() {
            game.tweens.removeFrom(imgGamePlayerHitL);
            game.tweens.removeFrom(imgGamePlayerHitR);
            imgGamePlayerHitL.alpha = 0;
            imgGamePlayerHitR.alpha =
                0;
            sprPlayerCar.frameName = sprPlayerCar.frameName = "car" + playerCarIdx + ".png";
            sprPlayerCar.healthMax = PLAYER_HEALTH[ShopUpgrades[playerCarIdx][SHOP_ARMOR]] * CAR_HEALTH_MUL[playerCarIdx];
            sprPlayerCar.health = sprPlayerCar.healthMax;
            sprPlayerCar.visible = !0;
            activeBonus = [];
            activeBonusTime = [];
            nitroMul = 1;
            playerFiringDelay = 0;
            soundManager.sounds.powerwall.stop()
        },
        isBonusActive: function(a) {
            return -1 != activeBonus.indexOf(a)
        },
        damagePlayerCar: function(a) {
            0 < a && ScenePlayerCar.instance.isBonusActive(BONUS_NITRO) || 0 >= sprPlayerCar.health ||
                (imgGamePlayerHitL.tint = 16711680, imgGamePlayerHitR.tint = 16711680, 0 > a && (imgGamePlayerHitL.tint = 65280, imgGamePlayerHitR.tint = 65280), imgGamePlayerHitL.alpha = 0, imgGamePlayerHitR.alpha = 0, game.add.tween(imgGamePlayerHitL).to({
                    alpha: .5
                }, 80, Phaser.Easing.Quartic.Out, !0, 0, 0, !0), game.add.tween(imgGamePlayerHitR).to({
                    alpha: .5
                }, 80, Phaser.Easing.Quartic.Out, !0, 0, 0, !0), sprPlayerCar.health -= a, sprPlayerCar.health > sprPlayerCar.healthMax && (sprPlayerCar.health = sprPlayerCar.healthMax), sprPlayerCarHit.alpha = 0, game.add.tween(sprPlayerCarHit).to({
                        alpha: .3
                    },
                    100, Phaser.Easing.Quartic.Out, !0, 0, 0, !0), SceneGUI.instance.setPlayerHealthPerc(sprPlayerCar.health / sprPlayerCar.healthMax), 0 >= sprPlayerCar.health && ScenePlayerCar.instance.explodePlayerCar())
        },
        explodePlayerCar: function() {
            soundManager.sounds.powerwall.stop();
            playExplosion();
            sprPlayerCarExplosion.reset(sprPlayerCar.x, sprPlayerCar.y);
            sprPlayerCarExplosion.animations.play("explode");
            sprPlayerCar.visible = !1;
            sprPlayerLaserBeam.alpha = 0;
            sprPlayerLaserSpark.alpha = 0
        },
        onPlayerCarHasExploded: function() {
            sprPlayerCarExplosion.visible = !1;
            SceneGame.instance.GameOver()
        },
        updatePlayer: function() {
            0 >= sprPlayerCar.health || (this.updatePlayerControls(game.input.activePointer), this.updatePlayerFiring(), this.updatePlayerVsBonuses(), this.updatePlayerVsCars(), this.updatePlayerVsTraps(), this.updateActiveBonus())
        },
        updatePlayerFiring: function() {
            if (gameRunning && (sprPlayerCarGuns.frameDelay -= 500 * gameTimeDelta(), 0 >= sprPlayerCarGuns.frameDelay && (sprPlayerCarGuns.frameName = "gun" + playerGuns + ".png", sprPlayerCarGuns.y = -60, sprPlayerCarExtraGunL.frameName =
                    "gun1.png", sprPlayerCarExtraGunL.position.setTo(-20, -10), sprPlayerCarExtraGunR.frameName = "gun1.png", sprPlayerCarExtraGunR.position.setTo(20, -10)), playerFiringDelay -= 500 * gameTimeDelta(), !(0 < playerFiringDelay) || ScenePlayerCar.instance.isBonusActive(BONUS_LASER)))
                if (playerFiringDelay = projectilesDelay, sprPlayerCarGuns.frameName = "gun" + playerGuns + "_light.png", sprPlayerCarGuns.y = -57, sprPlayerCarGuns.frameDelay = 40, ScenePlayerCar.instance.isBonusActive(BONUS_LASER)) sprPlayerLaserBeam.alpha = 1, sprPlayerLaserSpark.alpha =
                    1, sprPlayerLaserBeam.position.setTo(sprPlayerCarGuns.worldPosition.x - grpSceneGameCars.x, sprPlayerCarGuns.worldPosition.y), sprPlayerLaserSpark.position.setTo(sprPlayerCarGuns.worldPosition.x - grpSceneGameCars.x, sprPlayerCarGuns.worldPosition.y + 30), sprPlayerCarGuns.angle = -sprPlayerCar.angle, sprPlayerCarGuns.frameName = BONUS_LASER, sprPlayerCarExtraGunL.visible = !1, sprPlayerCarExtraGunR.visible = !1, ScenePlayerCar.instance.damageCarsWithLaserBeam(GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_LASER]] / 2 * playerCarIdx);
                else {
                    sprPlayerLaserBeam.alpha = 0;
                    sprPlayerLaserSpark.alpha = 0;
                    sprPlayerLaserBeam.position.setTo(-1E3, -1E3);
                    sprPlayerLaserSpark.position.setTo(-1E3, -1E3);
                    sprPlayerCarGuns.angle = 0;
                    var a = Math.ceil(ShopUpgrades[playerCarIdx][SHOP_GUNS] / 3);
                    1 == playerGuns && (1 >= a ? this.spawnPlayerProjectile("shot1.png", 0, -400, 0, sprPlayerCar.x, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]) : 2 == a ? (this.spawnPlayerProjectile("shot1.png", -40, -400, -5, sprPlayerCar.x, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]),
                        this.spawnPlayerProjectile("shot1.png", 40, -400, 5, sprPlayerCar.x, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]])) : (this.spawnPlayerProjectile("shot1.png", -20, -400, -5, sprPlayerCar.x, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot1.png", 0, -400, 0, sprPlayerCar.x, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot1.png", 20, -400, 5, sprPlayerCar.x, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]])));
                    2 == playerGuns && (1 >= a ? (this.spawnPlayerProjectile("shot2.png", 0, -400, 0, sprPlayerCar.x - 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot2.png", 0, -400, 0, sprPlayerCar.x + 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]])) : (2 == a ? (this.spawnPlayerProjectile("shot2.png", 0, -400, 0, sprPlayerCar.x, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot2.png", -20, -400, 0, sprPlayerCar.x - 12, sprPlayerCar.y -
                        50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]])) : (this.spawnPlayerProjectile("shot2.png", 0, -400, 0, sprPlayerCar.x - 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot2.png", -20, -400, 0, sprPlayerCar.x - 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot2.png", 0, -400, 0, sprPlayerCar.x + 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]])), this.spawnPlayerProjectile("shot2.png", 20, -400, 0,
                        sprPlayerCar.x + 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]])));
                    3 <= playerGuns && (1 >= a ? (this.spawnPlayerProjectile("shot3.png", 0, -400, 0, sprPlayerCar.x - 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot3.png", 0, -400, 0, sprPlayerCar.x, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot3.png", 0, -400, 0, sprPlayerCar.x + 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]])) :
                        2 == a ? (this.spawnPlayerProjectile("shot3.png", -20, -400, -10, sprPlayerCar.x - 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot3.png", -10, -400, -5, sprPlayerCar.x, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot3.png", 10, -400, 5, sprPlayerCar.x, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot3.png", 20, -400, 10, sprPlayerCar.x + 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]])) :
                        (this.spawnPlayerProjectile("shot3.png", -40, -400, -10, sprPlayerCar.x - 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot3.png", -15, -400, -5, sprPlayerCar.x - 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot3.png", 0, -400, 0, sprPlayerCar.x, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]), this.spawnPlayerProjectile("shot3.png", 15, -400, 5, sprPlayerCar.x + 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]]),
                            this.spawnPlayerProjectile("shot3.png", 40, -400, 10, sprPlayerCar.x + 12, sprPlayerCar.y - 50, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_GUNS]])));
                    soundManager.playSound("laser");
                    0 == ShopUpgrades[playerCarIdx][SHOP_EXTRA_GUNS] ? (sprPlayerCarExtraGunL.visible = !1, sprPlayerCarExtraGunR.visible = !1) : (sprPlayerCarExtraGunL.visible = !0, sprPlayerCarExtraGunR.visible = !0, sprPlayerCarExtraGunL.frameName = "gun1_light.png", sprPlayerCarExtraGunL.position.setTo(-19, -8), sprPlayerCarExtraGunL.frameDelay = 40, sprPlayerCarExtraGunR.frameName =
                        "gun1_light.png", sprPlayerCarExtraGunR.position.setTo(19, -8), sprPlayerCarExtraGunR.frameDelay = 40, this.spawnPlayerProjectile("shot1.png", -200, -400, -20, sprPlayerCar.x - 20, sprPlayerCar.y - 10, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_EXTRA_GUNS]]), this.spawnPlayerProjectile("shot1.png", 200, -400, 20, sprPlayerCar.x + 20, sprPlayerCar.y - 10, GUN_DMG[ShopUpgrades[playerCarIdx][SHOP_EXTRA_GUNS]]))
                }
        },
        spawnPlayerProjectile: function(a, b, c, d, e, f, g) {
            sprProjectile = SceneGame.instance.getFreeProjectile();
            null != sprProjectile &&
                (sprProjectile.frameName = a, sprProjectile.playerProjectile = !0, sprProjectile.spdX = b, sprProjectile.spdY = c, sprProjectile.angle = d, sprProjectile.reset(e, f), sprProjectile.dmg = g)
        },
        updatePlayerControls: function(a) {
            if (gameRunning && !(140 > a.y)) {
                var b = Math.floor(a.x);
                sprPlayerCar.rotation = 0;
                if (a.isDown) {
                    a = b - sprPlayerCar.worldPosition.x;
                    var c = Math.abs(a);
                    200 < c && (c = 200);
                    c = c / 100 * PLAYER_STEERING_SPEED * 1.2; - 5 > a ? (sprPlayerCar.angle = -c / 70, sprPlayerCar.x -= c * gameTimeDelta(), -5 < b - sprPlayerCar.worldPosition.x && (sprPlayerCar.worldPosition.x =
                        b + 5)) : 5 < a && (sprPlayerCar.angle = c / 70, sprPlayerCar.x += c * gameTimeDelta(), 5 > b - sprPlayerCar.worldPosition.x && (sprPlayerCar.worldPosition.x = b - 5))
                }
                sprPlayerCar.x < -BORDER && (sprPlayerCar.x = -BORDER);
                sprPlayerCar.x > +BORDER && (sprPlayerCar.x = +BORDER)
            }
        },
        updatePlayerVsBonuses: function() {
            var a = SceneGame.instance.getBonusInCollisionWithSprite(sprPlayerCar);
            null != a && (a.visible = !1, a.frameName == BONUS_HEALTH && ScenePlayerCar.instance.damagePlayerCar(.25 * -sprPlayerCar.healthMax), a.frameName == BONUS_MAGNET && ScenePlayerCar.instance.setActiveBonus(BONUS_MAGNET),
                a.frameName == BONUS_NITRO && ScenePlayerCar.instance.setActiveBonus(BONUS_NITRO), a.frameName == BONUS_LASER && (ScenePlayerCar.instance.setActiveBonus(BONUS_LASER), soundManager.playSound("powerwall")), "bonus_cash.png" == a.frameName && (PlayerCash += 20, soundManager.playSound("coin"), SceneGUI.instance.setPlayerCashVal(PlayerCash), bitmapTextParticles.CreateTextParticle1(sprPlayerCar.worldPosition.x, sprPlayerCar.worldPosition.y - 80, "+20", 25, 53643, Phaser.PIXI.blendModes.NORMAL)), a.animations.currentAnim.isPlaying &&
                (PlayerCash += 2, soundManager.playSound("coin"), SceneGUI.instance.setPlayerCashVal(PlayerCash), bitmapTextParticles.CreateTextParticle1(sprPlayerCar.worldPosition.x, sprPlayerCar.worldPosition.y - 80, "+2", 25, 53643, Phaser.PIXI.blendModes.NORMAL)))
        },
        setActiveBonus: function(a) {
            ScenePlayerCar.instance.isBonusActive(a) || activeBonus.push(a);
            var b = SHOP_MAGNET;
            a == BONUS_NITRO && (b = SHOP_NITRO, nitroMul = 2, sprPlayerCarShield.visible = !0);
            a == BONUS_LASER && (b = SHOP_GUNS);
            isNumeric(activeBonusTime[a]) ? activeBonusTime[a] +=
                1E3 * BONUSES_DURATIONS[b] : activeBonusTime[a] = 1E3 * BONUSES_DURATIONS[b];
            BoostersUsed++
        },
        updateActiveBonus: function() {
            gameRunning && (activeBonus.forEach(function(a) {
                    activeBonusTime[a] -= game.time.elapsedMS;
                    0 >= activeBonusTime[a] && (activeBonusTime[a] = 0, a == BONUS_NITRO && (sprPlayerCarShield.visible = !1, nitroMul = 1), a == BONUS_LASER && soundManager.sounds.powerwall.stop(), activeBonus.splice(activeBonus.indexOf(a), 1))
                }), SceneGUI.instance.setPlayerBonusLeftDuration(activeBonusTime[BONUS_MAGNET]), SceneGUI.instance.setPlayerBonusRightDuration(activeBonusTime[BONUS_NITRO]),
                SceneGUI.instance.setPlayerBonusCenterDuration(activeBonusTime[BONUS_LASER]))
        },
        updatePlayerVsCars: function() {
            if (gameRunning) {
                var a = SceneGame.instance.getCarInCollisionWithSprite(sprPlayerCar);
                null != a && (ScenePlayerCar.instance.damagePlayerCar(.1 * a.lifeMax), SceneGame.instance.isItRocket(a) && SceneGame.instance.hideRoadWarning(a.lane), SceneGame.instance.explodeCar(a), SceneGame.instance.shakeScreen(50, 5))
            }
        },
        updatePlayerVsTraps: function() {
            if (gameRunning) {
                var a = SceneRoad.instance.getTrapInCollisionWithSprite(sprPlayerCar);
                null != a && ScenePlayerCar.instance.damagePlayerCar(a.dmg)
            }
        },
        isPlayerCarInCollisionWithSprite: function(a) {
            return !a.visible || Math.abs(a.y - sprPlayerCar.y) > (a.height + sprPlayerCar.height) / 2 || Math.abs(a.x - sprPlayerCar.x) > (a.width + sprPlayerCar.width) / 2 ? !1 : !0
        },
        damageCarsWithLaserBeam: function(a) {
            for (var b = sprCars.length - 1; 0 <= b; b--) {
                var c = sprCars[b];
                c.visible && (0 >= c.life || 0 > c.y || Math.abs(sprPlayerCar.x - c.x) > (.6 * sprPlayerCar.width + c.width) / 2 || SceneGame.instance.damageCar(c, a))
            }
        },
        onResolutionChange: function() {},
        update: function() {
            ScenePlayerCar.instance.updatePlayer()
        },
        ShowAnimated: function() {
            ScenesTransitions.transitionStarted();
            ScenesTransitions.showSceneAlpha(grpScenePlayerCar, 0, ScenesTransitions.TRANSITION_LENGTH);
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Linear.In;
            var a = game.add.tween(sprPlayerCar.position).to({
                x: 0,
                y: game.height - 100
            }, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_EFFECT_IN, !1);
            a.onComplete.add(ScenesTransitions.transitionFinished);
            a.start()
        }
    };
    var SceneMenu = function() {
        SceneMenu.instance = this;
        this.create()
    };
    SceneMenu.instance = null;
    SceneMenu.prototype = {
        create: function() {
            grpSceneMenu = game.add.group();
            grpSceneMenu.name = "grpSceneMenu";
            btnMenuPlay = game.add.sprite(game.width >> 1, game.height - 50, "pak2", "icon_play2.png");
            btnMenuPlay.anchor.set(.5);
            btnMenuPlay.scale.set(1);
            grpSceneMenu.add(btnMenuPlay);
            AddButtonEvents(btnMenuPlay, this.OnPressedPlay, ButtonOnInputOver, ButtonOnInputOut);
            btnMenuInstructions = game.add.sprite((game.width >> 1) + 60, game.height - 50, "pak2", "icon_help.png");
            btnMenuInstructions.anchor.set(.5);
            grpSceneMenu.add(btnMenuInstructions);
            AddButtonEvents(btnMenuInstructions, this.OnPressedPauseInstructions, ButtonOnInputOver, ButtonOnInputOut);
            btnMenuLang = game.add.sprite((game.width >> 1) - 60, game.height - 50, "pak2", "lang_0.png");
            btnMenuLang.width = btnMenuInstructions.width;
            btnMenuLang.height = btnMenuInstructions.width;
            btnMenuLang.anchor.set(.5);
            grpSceneMenu.add(btnMenuLang);
            AddButtonEvents(btnMenuLang, this.OnPressedPauseLang, ButtonOnInputOver, ButtonOnInputOut);
            SceneMenu.instance.UpdateLangIcon(btnMenuLang);
            grpSceneMenu.visible = !1;
            this.onResolutionChange()
        },
        onResolutionChange: function() {
            btnMenuPlay.position.setTo(game.width >> 1, game.height - 60);
            btnMenuInstructions.reset(game.width - 50, game.height - 50);
            btnMenuLang.reset(50, game.height - 50);
            btnMenuLang.width = btnMenuInstructions.width;
            btnMenuLang.height = btnMenuInstructions.width
        },
        updateTexts: function() {
            SceneMenu.instance.UpdateLangIcon(btnMenuLang)
        },
        UpdateLangIcon: function(a) {
            switch (Languages.instance.language) {
                case "en":
                    a.frameName = "lang_0.png";
                    break;
                case "fr":
                    a.frameName = "lang_2.png";
                    break;
                case "pt":
                    a.frameName =
                        "lang_4.png";
                    break;
                case "de":
                    a.frameName = "lang_1.png";
                    break;
                case "it":
                    a.frameName = "lang_5.png";
                    break;
                case "es":
                    a.frameName = "lang_3.png";
                    break;
                case "ru":
                    a.frameName = "lang_6.png"
            }
        },
        OnPressedPlay: function() {
			gradle.event('btn_play');
            soundManager.playSound("menu-click1");
            SceneMenu.instance.HideAnimated();
            SceneLogo.instance.HideAnimated();
            SceneShop.instance.ShowAnimated()
        },
        OnPressedPauseLang: function() {
			//gradle.event('btn_pause');
            soundManager.playSound("menu-click1");
            SceneToReturnFromLanguage = SceneMenu.instance;
            SceneLogo.instance.HideAnimated();
            SceneMenu.instance.HideAnimated();
            SceneLanguages.instance.ShowAnimated()
        },
        OnPressedPauseInstructions: function() {
            soundManager.playSound("menu-click1");
            SceneToReturnFromInstructions = SceneMenu.instance;
            SceneLogo.instance.HideAnimated();
            SceneMenu.instance.HideAnimated();
            SceneInstructions.instance.ShowAnimated()
        },
        ShowAnimated: function(a) {
            void 0 === a && (a = 0);
            soundManager.playMusic("music_menu");
            soundManager.playSound("menu-click1");
            ScenesTransitions.transitionStarted();
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Linear.In;
            ScenesTransitions.showSceneAlpha(grpSceneMenu,
                a + 100, ScenesTransitions.TRANSITION_LENGTH);
            ScenesTransitions.showSceneScale(btnMenuPlay, a + 200, 200, null, Phaser.Easing.Back.Out);
            ScenesTransitions.showSceneScale(btnMenuLang, a + 300, 200, null, Phaser.Easing.Back.Out);
            ScenesTransitions.showSceneScale(btnMenuInstructions, a + 400, 200, ScenesTransitions.transitionFinished, Phaser.Easing.Back.Out);
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Linear.In;
            a = .5 * game.height;
            a = game.add.tween(sprPlayerCar.position).to({
                x: 0,
                y: a
            }, 400, ScenesTransitions.TRANSITION_EFFECT_IN, !1);
            a.onComplete.add(ScenesTransitions.transitionFinished);
            a.start();
            a = game.add.tween(sprPlayerCar.scale).to({
                x: 1,
                y: 1
            }, 400, ScenesTransitions.TRANSITION_EFFECT_IN, !1);
            a.onUpdateCallback(function(a, c, d) {
                grpSceneRoad.scale.set(sprPlayerCar.scale.x);
                tileSpriteRoad.x = game.width / 2 / grpSceneRoad.scale.x
            }, this);
            a.start();
            roadSpeed = ROAD_SPEED_MENU
        },
        HideAnimated: function() {
            ScenesTransitions.transitionStarted();
            ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out;
            ScenesTransitions.hideSceneScale(btnMenuPlay,
                0, 200, null, Phaser.Easing.Back.In);
            ScenesTransitions.hideSceneScale(btnMenuLang, 100, 200, null, Phaser.Easing.Back.In);
            ScenesTransitions.hideSceneScale(btnMenuInstructions, 100, 200, null, Phaser.Easing.Back.In);
            ScenesTransitions.hideSceneAlpha(grpSceneMenu, 100, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.transitionFinished);
            ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out
        }
    };
    ShopPrices = [];
    ShopPrices[SHOP_ARMOR] = [150, 300, 500, 700, 900, 1E3, 1200, 1500, 1700, 2E3, 2400];
    ShopPrices[SHOP_GUNS] = [150, 300, 500, 700, 900, 1E3, 1200, 1500, 1700, 2E3, 2400];
    ShopPrices[SHOP_EXTRA_GUNS] = [150, 300, 500, 700, 900, 1E3, 1200, 1500, 1700, 2E3, 2400];
    ShopPrices[SHOP_MAGNET] = [150, 300, 500, 700, 900, 1E3, 1200, 1500, 1700, 2E3, 2400];
    ShopPrices[SHOP_NITRO] = [150, 300, 500, 700, 900, 1E3, 1200, 1500, 1700, 2E3, 2400];
    ShopPrices[SHOP_LASER] = [150, 300, 500, 700, 900, 1E3, 1200, 1500, 1700, 2E3, 2400];
    var SceneShop = function() {
        SceneShop.instance = this;
        this.create()
    };
    SceneShop.instance = null;
    SceneShop.prototype = {
        create: function() {
            grpSceneShop = game.add.group();
            SceneShop.arrowAnimOffset = 0;
            btnShopPrevCar = grpSceneShop.create(50, game.height / 5 * 3.5, "pak2", "icon_arrow_left.png");
            btnShopPrevCar.anchor.set(.5);
            btnShopPrevCar.scale.set(1.3);
            AddButtonEvents(btnShopPrevCar, this.OnPressedShopPrevCar, ButtonOnInputOver, ButtonOnInputOut);
            game.add.tween(SceneShop).to({
                arrowAnimOffset: 5
            }, 500, Phaser.Easing.Quadratic.Out, !0, 50, -1, !0).onUpdateCallback(function() {
                btnShopPrevCar.x = game.width / 2 - 120 - SceneShop.arrowAnimOffset;
                btnShopNextCar.x = game.width / 2 + 120 + SceneShop.arrowAnimOffset
            }, this);
            btnShopNextCar = grpSceneShop.create(game.width - 50, game.height / 5 * 3.5, "pak2", "icon_arrow_right.png");
            btnShopNextCar.anchor.set(.5);
            btnShopNextCar.scale.set(1.3);
            AddButtonEvents(btnShopNextCar, this.OnPressedShopNextCar, ButtonOnInputOver, ButtonOnInputOut);
            btnShopBackToMenu = grpSceneShop.create(50, game.height - 50, "pak2", "icon_back.png");
            btnShopBackToMenu.anchor.set(.5);
            AddButtonEvents(btnShopBackToMenu, this.OnPressedShopBackToMenu, ButtonOnInputOver,
                ButtonOnInputOut);
            btnShopContinue = game.add.sprite(game.width >> 1, game.height - 50, "pak2", "icon_play2.png");
            btnShopContinue.anchor.set(.5);
            btnShopContinue.scale.set(.77);
            grpSceneShop.add(btnShopContinue);
            AddButtonEvents(btnShopContinue, this.OnPressedShopContinue, ButtonOnInputOver, ButtonOnInputOut);
            imgShopBG = CreateBoardSpr(game.width >> 1, game.height >> 1, 470, 470, "pak2", "dialog_bg", .5, .5, 470, 470);
            grpSceneShop.addChild(imgShopBG);
            btnUpgradeItem = [];
            btnUpgradeItem[SHOP_ARMOR] = this.CreateShopUpgradeRegion(SHOP_ARMOR,
                "icon_armor.png");
            btnUpgradeItem[SHOP_GUNS] = this.CreateShopUpgradeRegion(SHOP_GUNS, "icon_guns.png");
            btnUpgradeItem[SHOP_EXTRA_GUNS] = this.CreateShopUpgradeRegion(SHOP_EXTRA_GUNS, "icon_extra_guns.png");
            btnUpgradeItem[SHOP_MAGNET] = this.CreateShopUpgradeRegion(SHOP_MAGNET, "bonus_magnet.png");
            btnUpgradeItem[SHOP_NITRO] = this.CreateShopUpgradeRegion(SHOP_NITRO, "bonus_nitro.png");
            btnUpgradeItem[SHOP_LASER] = this.CreateShopUpgradeRegion(SHOP_LASER, "bonus_laser.png");
            imgShopBG.addChild(btnUpgradeItem[SHOP_ARMOR]);
            imgShopBG.addChild(btnUpgradeItem[SHOP_GUNS]);
            imgShopBG.addChild(btnUpgradeItem[SHOP_EXTRA_GUNS]);
            imgShopBG.addChild(btnUpgradeItem[SHOP_MAGNET]);
            imgShopBG.addChild(btnUpgradeItem[SHOP_NITRO]);
            imgShopBG.addChild(btnUpgradeItem[SHOP_LASER]);
            btnUpgradeItem[SHOP_ARMOR].position.setTo(-125, -100);
            btnUpgradeItem[SHOP_GUNS].position.setTo(0, -100);
            btnUpgradeItem[SHOP_EXTRA_GUNS].position.setTo(125, -100);
            btnUpgradeItem[SHOP_MAGNET].position.setTo(-125, 95);
            btnUpgradeItem[SHOP_NITRO].position.setTo(0, 95);
            btnUpgradeItem[SHOP_LASER].position.setTo(125,
                95);
            imgShopQuestsBG = CreateBoardSpr(game.width >> 1, game.height >> 1, 470, 470, "pak2", "dialog_bg", .5, .5, 470, 470);
            grpSceneShop.addChild(imgShopQuestsBG);
            imgShopQuestsBG.visible = !1;
            btnQuestItem = [];
            btnQuestItem[0] = this.CreateShopQuestItem(0);
            btnQuestItem[1] = this.CreateShopQuestItem(1);
            btnQuestItem[2] = this.CreateShopQuestItem(2);
            imgShopQuestsBG.addChild(btnQuestItem[0]);
            imgShopQuestsBG.addChild(btnQuestItem[1]);
            imgShopQuestsBG.addChild(btnQuestItem[2]);
            btnQuestItem[0].position.setTo(0, -145);
            btnQuestItem[1].position.setTo(0, -45);
            btnQuestItem[2].position.setTo(0, 55);
            btnQuestBuyLocked = grpSceneShop.create(0, 150, "pak2", "buy_bt2.png");
            btnQuestBuyLocked.anchor.set(.5);
            imgShopQuestsBG.addChild(btnQuestBuyLocked);
            txtQuestBuyLocked = game.add.bitmapText(-20, -4, "gamefont_TA", "LOCKED", 25);
            txtQuestBuyLocked.anchor.setTo(.5, .5);
            txtQuestBuyLocked.tint = 16777215;
            btnQuestBuyLocked.addChild(txtQuestBuyLocked);
            btnQuestBuy = grpSceneShop.create(0, 150, "pak2", "buy_bt1.png");
            btnQuestBuy.anchor.set(.5);
            imgShopQuestsBG.addChild(btnQuestBuy);
            AddButtonEvents(btnQuestBuy,
                this.OnPressedQuestBuy, ButtonOnInputOver, ButtonOnInputOut);
            txtQuestBuy = game.add.bitmapText(-20, -4, "gamefont_TA", "1520", 30);
            txtQuestBuy.anchor.setTo(.5, .5);
            txtQuestBuy.tint = 16777215;
            btnQuestBuy.addChild(txtQuestBuy);
            imgShopInfoBg = grpSceneShop.create(150, 100, "pak2", "info_bg.png");
            imgShopInfoBg.anchor.set(.5);
            imgShopInfoBgBtnClose = grpSceneShop.create(210, -5, "pak2", "void.png");
            imgShopInfoBgBtnClose.anchor.set(.5);
            imgShopInfoBgBtnClose.width = 30;
            imgShopInfoBgBtnClose.height = 30;
            imgShopInfoBgBtnClose.tint =
                16711680;
            imgShopInfoBg.addChild(imgShopInfoBgBtnClose);
            AddButtonEvents(imgShopInfoBgBtnClose, function() {
                imgShopInfoBg.closeTime = 0;
                ScenesTransitions.hideSceneAlpha(imgShopInfoBg)
            });
            txtInfoTitle = createShadowedBitmapText(-180, -4, 20, "Armor:", 0, .5);
            txtInfoTitle.textTop.tint = 16776960;
            imgShopInfoBg.addChild(txtInfoTitle);
            txtInfoDesc = createShadowedBitmapText(-120, -4, 20, "Endure more damage", 0, .5);
            txtInfoDesc.x = txtInfoTitle.x + txtInfoTitle.textTop.width + 10;
            imgShopInfoBg.addChild(txtInfoDesc);
            imgShopInfoBg.visible = !1;
            imgShopInfoBg.closeTime = 0;
            this.onResolutionChange();
            playerCarIdx = 1;
            grpSceneShop.visible = !1
        },
        update: function() {
            0 < imgShopInfoBg.closeTime && (imgShopInfoBg.closeTime -= game.time.elapsedMS, 0 >= imgShopInfoBg.closeTime && (imgShopInfoBg.closeTime = 0, ScenesTransitions.hideSceneAlpha(imgShopInfoBg)))
        },
        CreateShopUpgradeRegion: function(a, b) {
            var c = grpSceneShop.create(50, game.height - 50, "pak2", "stuff_bg.png");
            c.anchor.set(.5);
            c.scale.set(1);
            var d = grpSceneShop.create(0, 0 * c.height, "pak2", b);
            d.anchor.set(.5);
            d.scale.set(1);
            c.addChild(d);
            var e = grpSceneShop.create(0, .33 * -c.height, "pak2", "bar_bg.png");
            e.anchor.setTo(0, .5);
            e.x -= e.width / 2;
            c.addChild(e);
            var f = grpSceneShop.create(0, .33 * -c.height, "pak2", "bar.png");
            f.anchor.setTo(0, .5);
            f.width = Math.floor(.8 * c.width / c.scale.x) - 10;
            f.fullWidth = f.width;
            f.x -= f.width / 2;
            c.addChild(f);
            var g = grpSceneShop.create(0, .33 * -c.height, "pak2", "blankw.png");
            g.anchor.setTo(0, .5);
            g.height = f.height;
            g.width = Math.floor(.8 * c.width / c.scale.x) - 10;
            g.fullWidth = f.width;
            g.x -= f.width / 2;
            g.alpha = 0;
            c.addChild(g);
            var l = createShadowedBitmapText(0, .6 * -c.height, 27, "1 / 10", .5, .5);
            c.addChild(l);
            var h = grpSceneShop.create(50, -70, "pak2", "info.png");
            h.anchor.set(.5);
            c.addChild(h);
            AddButtonEvents(h, function() {
                ScenesTransitions.showSceneAlpha(imgShopInfoBg);
                var a = this.button.parent.upgradeIdx;
                a == SHOP_ARMOR && SceneShop.instance.setInfoText("ARMOR", "DESC_ARMOR");
                a == SHOP_GUNS && SceneShop.instance.setInfoText("FRONT_GUN", "DESC_FRONT_GUN");
                a == SHOP_EXTRA_GUNS && SceneShop.instance.setInfoText("SIDE_GUNS", "DESC_SIDE_GUNS");
                a ==
                    SHOP_MAGNET && SceneShop.instance.setInfoText("MAGNET", "DESC_MAGNET");
                a == SHOP_NITRO && SceneShop.instance.setInfoText("NITRO", "DESC_NITRO");
                a == SHOP_LASER && SceneShop.instance.setInfoText("LASER", "DESC_LASER");
                imgShopInfoBg.closeTime = 3E3
            }, ButtonOnInputOver, ButtonOnInputOut);
            var n = grpSceneShop.create(0, .6 * c.height, "pak2", "stuff_button.png");
            n.anchor.set(.5);
            n.scale.set(1);
            c.addChild(n);
            var m = createShadowedBitmapText(-17, 64, 23, "BLAH BLAH BLAH", .5, .5);
            c.addChild(m);
            var k = game.add.sprite(-49, 44, "pak2", "exclamation.png");
            k.anchor.set(.5);
            c.addChild(k);
            c.sprIcon = d;
            c.imgBarBg = e;
            c.imgBarFill = f;
            c.imgBarFillBlink = g;
            c.txtProgress = l;
            c.upgradeIdx = a;
            c.btnPurchase = n;
            c.txtPrice = m;
            c.imgInfo = h;
            c.imgExcl = k;
            AddButtonEvents(c.btnPurchase, SceneShop.instance.OnPressedUpgradeItem, ButtonOnInputOver, ButtonOnInputOut);
            return c
        },
        setInfoText: function(a, b) {
            setShadowBitmapText(txtInfoTitle, str(a) + ": " + str(b), !0);
            updateBitmapTextToWidth(txtInfoTitle.textTop, 20, 370);
            updateBitmapTextToWidth(txtInfoTitle.textTop, 20, 370);
            var c = txtInfoTitle.textTop.fontSize;
            setShadowBitmapText(txtInfoTitle, str(a) + ": ", !0);
            txtInfoTitle.textTop.fontSize = c;
            txtInfoTitle.textShadow.fontSize = c;
            setShadowBitmapText(txtInfoDesc, str(b), !0);
            txtInfoDesc.textTop.fontSize = c;
            txtInfoDesc.textShadow.fontSize = c;
            txtInfoDesc.x = txtInfoTitle.x + txtInfoTitle.textTop.width + 10
        },
        UpdateUpgradeItems: function(a) {
            void 0 === a && (a = -1);
            imgShopQuestsBG.visible = !1;
            imgShopBG.visible = !0;
            if (0 < CarPrice[playerCarIdx]) imgShopQuestsBG.visible = !0, imgShopBG.visible = !1;
            else {
                LOG("PlayerCash = " + PlayerCash);
                for (var b =
                        0; 6 > b; b++) {
                    btnUpgradeItem[b].imgExcl.visible = !1;
                    btnUpgradeItem[b].btnPurchase.frameName = "stuff_button.png";
                    setShadowBitmapText(btnUpgradeItem[b].txtPrice, "" + ShopPrices[b][ShopUpgrades[playerCarIdx][b]]);
                    ShopPrices[b][ShopUpgrades[playerCarIdx][b]] > PlayerCash && (btnUpgradeItem[b].btnPurchase.frameName = "stuff_button_gray.png");
                    10 == ShopUpgrades[playerCarIdx][b] ? (btnUpgradeItem[b].btnPurchase.frameName = "stuff_button_gray.png", setShadowBitmapText(btnUpgradeItem[b].txtPrice, "Max."), setShadowBitmapText(btnUpgradeItem[b].txtProgress,
                        "MAXED")) : setShadowBitmapText(btnUpgradeItem[b].txtProgress, "" + ShopUpgrades[playerCarIdx][b] + " / 10");
                    btnUpgradeItem[b].btnPurchase.cachedTint = -1;
                    LOG(b + " : " + ShopPrices[b][ShopUpgrades[playerCarIdx][b]] + "  " + btnUpgradeItem[b].btnPurchase.frameName);
                    var c = btnUpgradeItem[b].imgBarFill.fullWidth * ShopUpgrades[playerCarIdx][b] / 10;
                    btnUpgradeItem[b].imgBarFill.visible = !0;
                    0 >= c && (c = 1, btnUpgradeItem[b].imgBarFill.visible = !1);
                    btnUpgradeItem[b].imgBarFillBlink.width = btnUpgradeItem[b].imgBarFill.width;
                    b == a ? (btnUpgradeItem[b].imgBarFillBlink.alpha =
                        0, game.add.tween(btnUpgradeItem[b].imgBarFill).to({
                            width: c
                        }, 300, Phaser.Easing.Quartic.Out, !0, 20, 0, !1), game.add.tween(btnUpgradeItem[b].imgBarFillBlink).to({
                            width: c
                        }, 300, Phaser.Easing.Quartic.Out, !0, 20, 0, !1), game.add.tween(btnUpgradeItem[b].imgBarFillBlink).to({
                            alpha: .5
                        }, 300, Phaser.Easing.Quartic.Out, !0, 20, 0, !0)) : (btnUpgradeItem[b].imgBarFill.width = c, btnUpgradeItem[b].imgBarFillBlink.alpha = 0)
                }
            }
        },
        EnoughCashToUpgrade: function() {
            for (var a = 0; 6 > a; a++)
                if (ShopPrices[a][ShopUpgrades[playerCarIdx][a]] <= PlayerCash) return !0;
            return !1
        },
        CreateShopQuestItem: function(a) {
            var b = game.add.sprite(0, 0, "pak2", "achievement_bg.png");
            b.anchor.set(.5);
            b.idx = a;
            a = createShadowedBitmapText(-144, 0, 32, a + 1 + ".", .5, .5);
            b.addChild(a);
            var c = createShadowedBitmapText(0, -24, 20, "BLAH BLAH BLAH", .5, .5);
            c.textTop.align = "center";
            c.textShadow.align = "center";
            b.addChild(c);
            var d = createShadowedBitmapText(0, 10, 32, "100 / 5000", .5, .5);
            d.textTop.tint = 53643;
            b.addChild(d);
            var e = grpSceneShop.create(155, 0, "pak2", "OK.png");
            e.anchor.set(.5);
            b.addChild(e);
            b.txtNum =
                a;
            b.txtTitle = c;
            b.txtProgress = d;
            b.imgCheck = e;
            return b
        },
        OnPressedUpgradeItem: function() {
            var a = this.button.parent.upgradeIdx;
            if (!(10 <= ShopUpgrades[playerCarIdx][a])) {
                var b = ShopPrices[a][ShopUpgrades[playerCarIdx][a]];
                PlayerCash < b ? SetPoingScaleTween(txtPlayerCash, 1.1, 70) : (PlayerCash -= b, GameData.Save(), soundManager.playSound("kaching"), SceneGUI.instance.setPlayerCashVal(PlayerCash), SetPoingScaleTween(txtPlayerCash, 1.1, 70), ShopUpgrades[playerCarIdx][a]++, SceneShop.instance.UpdateUpgradeItems(a), SceneShop.instance.UpdateSelectedCar(),
                    SceneShop.instance.UpdateCarQuests())
            }
        },
        OnPressedQuestBuy: function() {
            SceneShop.instance.CarQuestsCompleted() && (PlayerCash < CarPrice[playerCarIdx] ? SetPoingScaleTween(txtPlayerCash, 1.1, 70) : (PlayerCash -= CarPrice[playerCarIdx], soundManager.playSound("kaching"), SceneGUI.instance.setPlayerCashVal(PlayerCash), SetPoingScaleTween(txtPlayerCash, 1.1, 70), CarPrice[playerCarIdx] = 0, SceneShop.instance.UpdateSelectedCar(), SceneShop.instance.UpdateUpgradeItems(), GameData.Save(), imgShopBG.alpha = 0, imgShopBG.x = game.width >>
                1, ScenesTransitions.showSceneAlpha(imgShopBG), ScenesTransitions.hideSceneAlpha(imgShopQuestsBG, 0, ScenesTransitions.TRANSITION_LENGTH, function() {
                    imgShopQuestsBG.x = -1E4;
                    imgShopQuestsBG.alpha = 1
                })))
        },
        OnPressedShopPrevCar: function() {
            var a = imgShopBG;
            1 != playerCarIdx && (a = imgShopQuestsBG);
            playerCarIdx--;
            1 > playerCarIdx && (playerCarIdx = 3);
            var b = game.add.tween(a.position).to({
                x: game.width + 200
            }, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_EFFECT_IN, !0);
            game.add.tween(sprPlayerCar).to({
                    alpha: 0
                },
                ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_EFFECT_IN, !0);
            b.onComplete.add(function() {
                a = imgShopBG;
                0 < CarPrice[playerCarIdx] && (a = imgShopQuestsBG);
                a.alpha = 1;
                a.visible = !0;
                a.position.x = -200;
                SceneShop.instance.UpdateSelectedCar();
                SceneShop.instance.UpdateUpgradeItems();
                SceneShop.instance.UpdateCarQuests();
                game.add.tween(a.position).to({
                    x: game.width >> 1
                }, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_EFFECT_IN, !0);
                game.add.tween(sprPlayerCar).to({
                        alpha: 1
                    }, ScenesTransitions.TRANSITION_LENGTH,
                    ScenesTransitions.TRANSITION_EFFECT_IN, !0)
            })
        },
        OnPressedShopNextCar: function() {
            var a = imgShopBG;
            0 < CarPrice[playerCarIdx] && (a = imgShopQuestsBG);
            playerCarIdx++;
            3 < playerCarIdx && (playerCarIdx = 1);
            a = game.add.tween(a.position).to({
                x: -200
            }, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_EFFECT_IN, !0);
            game.add.tween(sprPlayerCar).to({
                alpha: 0
            }, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_EFFECT_IN, !0);
            a.onComplete.add(function() {
                var a = imgShopBG;
                0 < CarPrice[playerCarIdx] && (a =
                    imgShopQuestsBG);
                a.alpha = 1;
                a.visible = !0;
                a.position.x = game.width + 200;
                SceneShop.instance.UpdateSelectedCar();
                SceneShop.instance.UpdateUpgradeItems();
                SceneShop.instance.UpdateCarQuests();
                game.add.tween(a.position).to({
                    x: game.width >> 1
                }, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_EFFECT_IN, !0);
                game.add.tween(sprPlayerCar).to({
                    alpha: 1
                }, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_EFFECT_IN, !0)
            })
        },
        UpdateSelectedCar: function() {
            sprPlayerCar.frameName = "car" + playerCarIdx +
                ".png";
            sprPlayerCarHit.frameName = "car" + playerCarIdx + "_hit.png";
            playerGuns = playerCarIdx;
            sprPlayerCarGuns.frameName = "gun" + playerGuns + ".png";
            sprPlayerCarGuns.y = -60;
            sprPlayerCarExtraGunL.frameName = "gun1.png";
            sprPlayerCarExtraGunL.position.setTo(-20, -10);
            sprPlayerCarExtraGunR.frameName = "gun1.png";
            sprPlayerCarExtraGunR.position.setTo(20, -10);
            sprPlayerCarExtraGunL.visible = 0 < ShopUpgrades[playerCarIdx][SHOP_EXTRA_GUNS];
            sprPlayerCarExtraGunR.visible = 0 < ShopUpgrades[playerCarIdx][SHOP_EXTRA_GUNS];
            txtQuestBuy.text =
                "" + CarPrice[playerCarIdx];
            txtQuestBuyLocked.font = "gamefont_TA";
            "ru" == language && (txtQuestBuyLocked.font = "gamefont_RU");
            txtQuestBuyLocked.text = STR("LOCKED");
            updateBitmapTextToWidth(txtQuestBuyLocked, 25, 100);
            btnQuestBuyLocked.visible = 0 < CarPrice[playerCarIdx] && !SceneShop.instance.CarQuestsCompleted();
            btnQuestBuy.visible = 0 < CarPrice[playerCarIdx] && SceneShop.instance.CarQuestsCompleted();
            btnShopContinue.frameName = 0 < CarPrice[playerCarIdx] ? "icon_play_lock.png" : "icon_play2.png"
        },
        CarQuestsCompleted: function() {
            for (var a =
                    0; 3 > a; a++)
                if (CarQuests[playerCarIdx][a].getProgress() < CarQuests[playerCarIdx][a].getMax()) return !1;
            return !0
        },
        UpdateCarQuests: function() {
            if (1 != playerCarIdx)
                for (var a = 0; 3 > a; a++) setShadowBitmapText(btnQuestItem[a].txtTitle, CarQuests[playerCarIdx][a].getText(), !0), updateBitmapTextToWidth(btnQuestItem[a].txtTitle.textTop, 20, 240), updateBitmapTextToHeight(btnQuestItem[a].txtTitle.textTop, btnQuestItem[a].txtTitle.textTop.fontSize, 40), btnQuestItem[a].txtTitle.textShadow.fontSize = btnQuestItem[a].txtTitle.textTop.fontSize,
                    setShadowBitmapText(btnQuestItem[a].txtProgress, CarQuests[playerCarIdx][a].getProgress() + " / " + CarQuests[playerCarIdx][a].getMax()), btnQuestItem[a].imgCheck.visible = CarQuests[playerCarIdx][a].getProgress() >= CarQuests[playerCarIdx][a].getMax()
        },
        OnPressedShopContinue: function() {
            0 < CarPrice[playerCarIdx] ? (soundManager.playSound("menu-negative1"), SetPoingScaleTween(btnQuestBuyLocked, 1.1, 70), SetPoingScaleTween(btnQuestBuy, 1.1, 70)) : (gradleVideoContinue = function() {
                gamePaused = !1;
                SceneLogo.instance.HideAnimated();
                SceneShop.instance.HideAnimated();
                SceneGame.instance.ShowAnimated();
                SceneGame.instance.RestartGame();
            }, gradleVideoContinue())
        },
        onResolutionChange: function() {
            btnShopPrevCar.reset(game.width / 2 - 120, .2 * game.height);
            btnShopNextCar.reset(game.width / 2 + 120, .2 * game.height);
            sprPlayerCar.y < .2 * game.height && (sprPlayerCar.y = .2 * game.height);
            btnShopBackToMenu.reset(50, game.height - 50);
            btnShopContinue.reset(game.width / 2, game.height - 50);
            imgShopBG.x =
                game.width >> 1;
            imgShopBG.y = .22 * game.height + (btnShopBackToMenu.y - .22 * game.height) / 2;
            imgShopBG.height = btnShopContinue.y - btnShopContinue.height / 2 - (.22 * game.height + sprPlayerCar.height / 2);
            imgShopBG.scale.x = imgShopBG.scale.y;
            imgShopBG.width > game.width && (imgShopBG.width = game.width, imgShopBG.scale.y = imgShopBG.scale.x);
            imgShopQuestsBG.scale.set(imgShopBG.scale.x);
            imgShopQuestsBG.position.setTo(imgShopBG.x, imgShopBG.y);
            var a = .2 * game.height + sprPlayerCar.height / 2;
            imgShopInfoBg.position.setTo(game.width >> 1, a + .75 *
                (imgShopQuestsBG.y - imgShopQuestsBG.height / 2 - a))
        },
        updateTexts: function() {
            this.UpdateCarQuests()
        },
        OnPressedLevelSelectionBackToMenu: function() {
            soundManager.playSound("menu-click1");
            SceneShop.instance.HideAnimated();
            SceneLogo.instance.ShowAnimated();
            SceneMenu.instance.ShowAnimated()
        },
        OnPressedShopBackToMenu: function() {
            soundManager.playSound("menu-click1");
            SceneShop.instance.HideAnimated();
            SceneMenu.instance.ShowAnimated();
            SceneLogo.instance.ShowAnimated()
        },
        ShowAnimated: function() {
            "undefined" !== typeof gdsdk &&
                "undefined" !== gdsdk.showBanner && gdsdk.showBanner();
            SceneShop.instance.UpdateUpgradeItems();
            SceneShop.instance.UpdateSelectedCar();
            SceneShop.instance.UpdateCarQuests();
            SceneShop.instance.onResolutionChange();
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Quadratic.Out;
            ScenesTransitions.showSceneAlpha(grpSceneShop, 100, ScenesTransitions.TRANSITION_LENGTH);
            ScenesTransitions.showSceneScale(btnShopPrevCar, 100, 200, null, Phaser.Easing.Back.Out);
            ScenesTransitions.showSceneScale(btnShopNextCar, 100, 200,
                null, Phaser.Easing.Back.Out);
            for (var a = 0; a < btnUpgradeItem.length; a++) ScenesTransitions.showSceneScale(btnUpgradeItem[a], 200 + 50 * a, 200, null, Phaser.Easing.Back.Out, 1);
            ScenesTransitions.showSceneScale(btnShopBackToMenu, 500, 200, null, Phaser.Easing.Back.Out);
            ScenesTransitions.showSceneScale(btnShopContinue, 600, 200, null, Phaser.Easing.Back.Out, .77);
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Linear.In;
            a = game.add.tween(sprPlayerCar.position).to({
                x: 0,
                y: .2 * game.height
            }, 400, ScenesTransitions.TRANSITION_EFFECT_IN, !1);
            a.onComplete.add(ScenesTransitions.transitionFinished);
            a.start();
            a = game.add.tween(sprPlayerCar.scale).to({
                x: 1.2,
                y: 1.2
            }, 400, ScenesTransitions.TRANSITION_EFFECT_IN, !1);
            a.onUpdateCallback(function(a, c, d) {
                grpSceneRoad.scale.set(sprPlayerCar.scale.x);
                tileSpriteRoad.x = game.width / 2 / grpSceneRoad.scale.x
            }, this);
            a.start()
        },
        HideAnimated: function() {
            ScenesTransitions.transitionStarted();
            ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out;
            ScenesTransitions.hideSceneAlpha(grpSceneShop, .5 * ScenesTransitions.TRANSITION_LENGTH,
                ScenesTransitions.TRANSITION_LENGTH + 10, ScenesTransitions.transitionFinished);
            ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out
        }
    };
    MAX_CARS = 20;
    MAX_BONUSES = 10;
    ROAD_SPEED_MENU = 100;
    ROAD_SPEED_GAME = 700;
    ROAD_SPEED_NITRO = 1500;
    CARS_SPEED_MUL = 1;
    CAR_SPEED_BOSS = 0;
    CAR_SPEED = 200;
    CAR_SPEED_ROCKET = 1E3;
    BORDER = 190;
    LANE_WIDTH = 90;
    CAR_WAVE_HEIGHT = 450;
    BONUS_PERC_COIN = 70;
    BONUS_PERC_CASH = 30;
    CAR_AMBULANCE = "traffic1";
    CAR_GREEN = "traffic2";
    CAR_BLUE = "traffic3";
    CAR_LIMO = "traffic4";
    CAR_ARMORED = "traffic5";
    CAR_TAXI = "traffic6";
    TRUCK_GREEN = "traffic7";
    TRUCK_BLUE = "traffic8";
    TRUCK_ORANGE = "traffic9";
    TRUCK_TANK = "traffic10";
    ROCKET = "rocket";
    CAR_POLICE = "traffic11";
    CAR_BOSS1 = "traffic12";
    CAR_BOSS2 = "traffic13";
    CAR_BOSS3 = "traffic14";
    LANES = [-.31, -.15, 0, .15, .31];
    BONUS_HEALTH_VALS = [200, 220, 242, 266, 293, 322, 354, 389, 428, 471, 518];
    BONUSES_DURATIONS = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
    var gameRunning = !1,
        gamePaused = !1,
        SceneGame = function() {
            SceneGame.instance = this;
            this.create()
        };
    SceneGame.instance = null;
    SceneGame.prototype = {
        create: function() {
            slowTimeFactor = 1;
            game.time.desiredFps = 35;
            game.input.maxPointers = 1;
            grpSceneGame = game.add.group();
            grpSceneGameCars = game.add.group();
            grpSceneGame.add(grpSceneGameCars);
            grpSceneGameCars.x = game.width / 2;
            gameScore = 0;
            particles = new Particles(grpSceneGame);
            this.createCars();
            this.createProjectiles();
            this.createRoadWarnings();
            this.createBonuses();
            this.createDecorsTop();
            this.createCarWaves();
            btnGamePause = grpSceneGame.create(50, game.height - 50, "pak2", "icon_pause.png");
            btnGamePause.anchor.set(.5);
            AddButtonEvents(btnGamePause, this.OnPressedFromGameToPause, ButtonOnInputOver, ButtonOnInputOut);
            grpSceneGame.visible = !1;
            gameScore = 0;
            gameRunning = !1
        },
        update: function() {
            gamePaused || (gameRunning ? (SceneGame.instance.UpdateParticles(), SceneGame.instance.updateProjectiles(), SceneGame.instance.updateCars(), SceneGame.instance.updateCarWaves(), SceneGame.instance.updateBonuses(), SceneGame.instance.updateRoadWarnings(), SceneGame.instance.updateScreenShake()) : (SceneGame.instance.UpdateParticles(), SceneGame.instance.updateProjectiles(),
                SceneGame.instance.updateCars(), SceneGame.instance.updateBonuses(), SceneGame.instance.updateRoadWarnings()))
        },
        updateScreenShake: function() {
            if (0 < SceneGame._shakeWorldTime) {
                var a = SceneGame._shakeWorldTime / SceneGame._shakeWorldMax * SceneGame._shakeWorldMax,
                    b = game.rnd.integerInRange(-a, a),
                    a = game.rnd.integerInRange(-a, a);
                game.camera.x = b;
                game.camera.y = a;
                SceneGame._shakeWorldTime -= game.time.elapsedMS;
                0 >= SceneGame._shakeWorldTime && game.world.setBounds(0, 0, game.width, game.height)
            }
        },
        createDecorsTop: function() {
            sprDecorsTop = [];
            for (var a = 0; a < MAX_DECORS_TOP; a++) {
                var b = grpSceneGameCars.create(-1E3, -1E3, "pak2", "bush1.png");
                b.anchor.set(.5);
                b.visible = !1;
                sprDecorsTop.push(b)
            }
        },
        createRoadWarnings: function() {
            sprRoadWarnings = [];
            for (var a = 0; 5 > a; a++) sprRoadWarnings[a] = grpSceneGameCars.create(600 * LANES[a], 150, "pak2", "warning.png"), sprRoadWarnings[a].anchor.set(.5), sprRoadWarnings[a].visible = !1, sprRoadWarnings[a].alpha = 0;
            roadWarningAlphaIncMul = 1
        },
        showRoadWarning: function(a) {
            LOG("showRoadWarning(" + a + ")");
            sprRoadWarnings[a].visible = !0
        },
        hideRoadWarning: function(a) {
            LOG("hideRoadWarning(" + a + ")");
            sprRoadWarnings[a].visible = !1
        },
        hideRoadWarnings: function() {
            for (var a = 0; 5 > a; a++) sprRoadWarnings[a].visible = !1
        },
        updateRoadWarnings: function() {
            for (var a = roadWarningAlphaIncMul * gameTimeDelta() * 5, b = 0; 5 > b; b++) sprRoadWarnings[b].bringToTop(), sprRoadWarnings[b].alpha += a, 0 < roadWarningAlphaIncMul ? 1 <= sprRoadWarnings[b].alpha && (sprRoadWarnings[b].alpha = 1, roadWarningAlphaIncMul = -1) : 0 >= sprRoadWarnings[b].alpha && (sprRoadWarnings[b].alpha = 0, roadWarningAlphaIncMul =
                1)
        },
        createCarWaves: function() {
            carWavesCounter = carWaveOffset = 0
        },
        generateCarWave: function() {
            LOG("generateCarWave()");
            shuffleArray([0, 1, 2, 3, 4]);
            0 < carWavesCounter && 0 == carWavesCounter % (10 + 15 * PlayerLevel) ? SceneGame.instance.generateBossWave() : 5 == carWavesCounter % 10 && 35 <= gameScore ? SceneGame.instance.generateRoadStopsWave() : 0 < SceneGame.instance.getActiveCarsOfType([CAR_BOSS1, CAR_BOSS2, CAR_BOSS3]) ? 1 < PlayerLevel && SceneGame.instance.generateBossRocketsWave() : (0 == carWavesCounter % 2 && SceneGame.instance.generateDecors(),
                1 == carWavesCounter % 10 && 50 <= gameScore ? SceneGame.instance.generateRocketsWave() : SceneGame.instance.generateCommonCars())
        },
        generateRoadStopsWave: function() {
            var a = [0, 1, 2, 3, 4],
                b = 0;
            shuffleArray(a);
            diff = getRandomUInt(3);
            this.addTrapToLane(a[b], "hole2", -1E3);
            this.addTrapToLane(a[b], "roadblock", -950);
            this.addTrapToLane(a[b++], "road_sign1", -790);
            this.addTrapToLane(a[b], "hole2", -1E3 - 50 * diff);
            this.addTrapToLane(a[b], "roadblock", -950 - 50 * diff);
            this.addTrapToLane(a[b++], "road_sign1", -790 - 50 * diff);
            55 <= gameScore ?
                (this.addTrapToLane(a[b], "hole2", -1E3 - 100 * diff), this.addTrapToLane(a[b], "roadblock", -950 - 100 * diff), this.addTrapToLane(a[b++], "road_sign1", -790 - 100 * diff)) : this.addCarToLane(a[b++], this.getNextCar(), getRandomUInt(100));
            this.addCarToLane(a[b++], CAR_GREEN, getRandomUInt(200));
            carWavesCounter++
        },
        generateBossWave: function() {
            var a = CAR_BOSS1;
            2 == PlayerLevel % 3 && (a = CAR_BOSS2);
            0 == PlayerLevel % 3 && (a = CAR_BOSS3);
            this.addCarToLane(2, a, getRandomUInt(200));
            carWavesCounter++
        },
        generateBossRocketsWave: function() {
            var a = [0, 1, 2, 3, 4],
                b = 0;
            shuffleArray(a);
            1 == carWavesCounter % 10 && (diff = getRandomUInt(3), this.addCarToLane(a[b++], ROCKET, -1500), this.addCarToLane(a[b++], ROCKET, -1500 - 50 * diff), this.addCarToLane(a[b++], ROCKET, -1500 - 100 * diff), carWavesCounter++)
        },
        generateRocketsWave: function() {
            var a = [0, 1, 2, 3, 4],
                b = 0;
            shuffleArray(a);
            diff = getRandomUInt(3);
            this.addCarToLane(a[b++], ROCKET, -1500);
            this.addCarToLane(a[b++], ROCKET, -1500);
            60 <= gameScore ? this.addCarToLane(a[b++], ROCKET, -1500) : this.addCarToLane(a[b++], this.getNextCar(), getRandomUInt(100));
            70 <= gameScore ? this.addCarToLane(a[b++], ROCKET, -1500) : this.addCarToLane(a[b++], CAR_GREEN, getRandomUInt(200));
            carWavesCounter++
        },
        generateDecors: function() {
            var a = [0, 1, 2, 3, 4];
            shuffleArray(a);
            this.addTrapToLane(a[0], "road_sign2", getRandomUInt(200));
            switch (getRandomUInt(13)) {
                case 0:
                    this.addDecorAtPos("house_shadow1", getRandomUInt(200));
                    break;
                case 1:
                    this.addDecorAtPos("house_shadow2", getRandomUInt(200));
                    break;
                case 2:
                    this.addDecorAtPos("house_shadow3", getRandomUInt(200));
                    break;
                case 3:
                    this.addDecorAtPos("bush1",
                        getRandomUInt(200));
                    break;
                case 4:
                    this.addDecorAtPos("bush2", getRandomUInt(200));
                    break;
                case 5:
                    this.addDecorAtPos("tree1", getRandomUInt(200));
                    break;
                case 6:
                    this.addDecorAtPos("tree3", getRandomUInt(200));
                    break;
                case 7:
                    this.addDecorAtPos("tree4", getRandomUInt(200));
                    break;
                case 8:
                    this.addDecorAtPos("tree5", getRandomUInt(200));
                    break;
                case 9:
                    this.addDecorAtPos("palm1", getRandomUInt(200));
                    break;
                case 10:
                    this.addDecorAtPos("palm2", getRandomUInt(200));
                    break;
                case 11:
                    this.addDecorAtPos("palm3", getRandomUInt(200));
                    break;
                default:
                    this.addDecorAtPos("highway_sign1", getRandomUInt(200), !0)
            }
        },
        generateCommonCars: function() {
            var a = [0, 1, 2, 3, 4],
                b = 0;
            shuffleArray(a);
            this.addCarToLane(a[b], CAR_GREEN, 230 + getRandomUInt(50));
            this.addCarToLane(a[b++], this.getNextCar(), 0);
            500 >= getRandomUInt(1E3) && this.addCarToLane(a[b++], this.getNextCar(), 10 * getRandomUInt(20));
            25 <= gameScore && (0 == carWavesCounter % 5 && this.addCarToLane(a[b], CAR_GREEN, 2 * getRandomUInt(25)), this.addCarToLane(a[b++], CAR_BLUE, 230));
            if (45 <= gameScore) {
                var c = [TRUCK_ORANGE,
                    TRUCK_GREEN, TRUCK_BLUE
                ];
                shuffleArray(c);
                75 <= gameScore && 1 > this.getActiveCarsOfType(c) && this.addCarToLane(a[b++], c[0], 2 * getRandomUInt(25));
                this.addCarToLane(a[b++], CAR_GREEN, 250)
            }
            4 >= b && 60 <= gameScore && (this.addTrapToLane(a[b], "hole2", -1E3), this.addTrapToLane(a[b], "roadblock", -950), this.addTrapToLane(a[b], "road_sign1", -790));
            carWavesCounter++
        },
        getActiveCarsOfType: function(a) {
            void 0 === a && (a = null);
            for (var b = 0, c = sprCars.length - 1; 0 <= c; c--) !sprCars[c].visible || null != a && -1 == a.indexOf(sprCars[c].car) || b++;
            return b
        },
        getNextCar: function() {
            var a = getRandomUInt(1E3),
                b = CAR_BLUE;
            600 >= a && 5 <= gameScore && this.getActiveCarsOfType(TRUCK_TANK) < gameScore / 30 && (b = TRUCK_TANK);
            500 >= a && 10 <= gameScore && (tmpCar = CAR_TAXI, 500 > getRandomUInt(1E3) && (tmpCar = CAR_LIMO), 1 > this.getActiveCarsOfType(tmpCar) && (b = tmpCar));
            400 >= a && 15 <= gameScore && this.getActiveCarsOfType(CAR_ARMORED) < gameScore / 30 && (b = CAR_ARMORED);
            300 >= a && 20 <= gameScore && 1 > this.getActiveCarsOfType(CAR_AMBULANCE) && (b = CAR_AMBULANCE);
            200 >= a && 80 <= gameScore && 1 > this.getActiveCarsOfType(CAR_POLICE) &&
                (b = CAR_POLICE);
            return b
        },
        addCarToLane: function(a, b, c) {
            LOG("addCarToLane(" + b + ", " + a + " y : " + c + ")");
            this.spawnNewCar(b, a, c)
        },
        addTrapToLane: function(a, b, c) {
            ScenePlayerCar.instance.isBonusActive(BONUS_NITRO) || ("hole2" != b && "roadblock" != b || SceneGame.instance.removePreparedCarFromLane(a), LOG("addTrapToLane(" + b + ", " + a + " y : " + c + ")"), SceneRoad.instance.spawnNewTrap(b, this.getTrapDmg(b), a, c))
        },
        addDecorAtPos: function(a, b, c) {
            void 0 === c && (c = !1);
            LOG("addDecorAtPos(" + a + ", y : " + b + ", top : " + c + ")");
            SceneRoad.instance.spawnNewDecor(a,
                b, c)
        },
        getTrapDmg: function(a) {
            return "hole" == a || "hole2" == a ? 1E3 : 0
        },
        updateCarWaves: function() {
            carWaveOffset >= CAR_WAVE_HEIGHT && (carWaveOffset -= CAR_WAVE_HEIGHT, this.generateCarWave())
        },
        removePreparedCarFromLane: function(a) {
            for (var b = sprCars.length - 1; 0 <= b; b--) !sprCars[b].visible || sprCars[b].lane != a || sprCars[b].y > -sprCars[b].height / 2 || SceneGame.instance.isItRocket(sprCars[b]) || (sprCars[b].visible = !1)
        },
        slowerCarInLaneBelow: function(a, b) {
            for (var c = sprCars.length - 1; 0 <= c; c--)
                if (sprCars[c].visible && sprCars[c].lane ==
                    a && SceneGame.instance.isItBoss(sprCars[c]) && !(sprCars[c].y < b)) return !0;
            return !1
        },
        carsInLane: function(a) {
            for (var b = sprCars.length - 1; 0 <= b; b--)
                if (sprCars[b].visible && sprCars[b].lane == a) return !0;
            return !1
        },
        trapInLaneBelow: function(a, b) {
            for (var c = sprTraps.length - 1; 0 <= c; c--)
                if (sprTraps[c].visible && sprTraps[c].lane == a && !("hole2" != sprTraps[c].trap && "roadblock" != sprTraps[c].trap || sprTraps[c].y < b)) return !0;
            return !1
        },
        getCarLife: function(a) {
            if (SceneGame.instance.isItBoss(a)) return 1E4 * PlayerLevel;
            var b = 700;
            if (a.car ==
                TRUCK_ORANGE || a.car == TRUCK_GREEN || a.car == TRUCK_BLUE) b = 900;
            if (a.car == CAR_AMBULANCE || a.car == CAR_LIMO || a.car == CAR_ARMORED || a.car == TRUCK_TANK) b = 1200;
            return b + 300 * PlayerLevel + 5 * gameScore
        },
        getCarSpeed: function(a) {
            var b = CAR_SPEED;
            this.isItRocket(a) && (b = CAR_SPEED_ROCKET);
            return b
        },
        isItRocket: function(a) {
            return "rocket.png" == a.frameName
        },
        isItBoss: function(a) {
            return a.car == CAR_BOSS1 || a.car == CAR_BOSS2 || a.car == CAR_BOSS3
        },
        createCars: function() {
            sprCars = [];
            for (var a = 0; a < MAX_CARS; a++) {
                var b = grpSceneGameCars.create(-1E3, -1E3, "pak2", "traffic1.png");
                b.animExplode = b.animations.add("explode", Phaser.Animation.generateFrameNames("explode_", 0, 11, ".png"), 30, !1);
                b.animExplode.onComplete.add(this.onCarHasExploded, this);
                b.animPolice = b.animations.add("police", Phaser.Animation.generateFrameNames("traffic11_", 0, 2, ".png"), 30, !0);
                b.anchor.set(.5);
                b.visible = !1;
                b.life = 100;
                b.gun = 1;
                b.bossProjectilesCnt = 0;
                b.carFiringDelay = 0;
                sprCars.push(b);
                b.hit = grpSceneGameCars.create(0, 0, "pak2", "traffic23_hit.png");
                b.hit.anchor.set(.5);
                b.hit.alpha =
                    0;
                b.addChild(b.hit);
                b.barBg = grpSceneGameCars.create(0, 0, "pak2", "button_bg.png");
                b.barBg.anchor.set(.5);
                b.barBg.width = 50;
                b.barBg.height = 10;
                b.addChild(b.barBg);
                b.barFill = grpSceneGameCars.create(0, 0, "pak2", "car_bar.png");
                b.barFill.anchor.setTo(0, .5);
                b.barFill.width = 48;
                b.barFill.height = 8;
                b.addChild(b.barFill);
                b.sprGun = grpScenePlayerCar.create(0, 30, "pak2", "gun1.png");
                b.sprGun.anchor.setTo(.5, .2);
                b.sprGun.angle = 0;
                b.addChild(b.sprGun);
                b.getCollisionWidth = function() {
                    return this.car == ROCKET ? .6 * this.width :
                        .8 * this.width
                }
            }
            sprPlayerLaserBeam = grpSceneGameCars.create(0, -60, "pak2", "beam.png");
            sprPlayerLaserBeam.anchor.setTo(.5, 1);
            sprPlayerLaserBeam.height = game.height;
            sprPlayerLaserBeam.frameDelay = 0;
            game.add.tween(sprPlayerLaserBeam.scale).to({
                x: .7
            }, 100, Phaser.Easing.Exponential.Out, !0, 0, -1, !0);
            sprPlayerLaserSpark = grpSceneGameCars.create(0, -60, "pak2", "laser1.png");
            sprPlayerLaserSpark.anchor.setTo(.5, 1);
            sprPlayerLaserSpark.animSpart = sprPlayerLaserSpark.animations.add("spark", Phaser.Animation.generateFrameNames("laser",
                1, 3, ".png"), 20, !0);
            sprPlayerLaserSpark.animations.play("spark")
        },
        getFreeCar: function() {
            for (var a = sprCars.length - 1; 0 <= a; a--)
                if (!sprCars[a].visible) return sprCars[a];
            return null
        },
        spawnNewCar: function(a, b, c) {
            var d = this.getFreeCar();
            if (null == d) LOG("spawnNewCar : no free car");
            else if (SceneGame.instance.slowerCarInLaneBelow(b, c)) LOG("spawnNewCar : slowerCarInLaneBelow");
            else if (SceneGame.instance.trapInLaneBelow(b)) LOG("spawnNewCar : trapInLaneBelow");
            else return d.reset(600 * LANES[b], -CAR_WAVE_HEIGHT +
                c), d.scale.set(1), d.rotation = 0, d.car = a, d.car == CAR_POLICE ? (d.gun = 3, d.animations.play("police")) : (d.animations.stop(), d.frameName = a + ".png"), d.spdY = this.getCarSpeed(d), d.lifeMax = this.getCarLife(d), d.bonusPerc = 10, d.lane = b, SceneGame.instance.loadCarHitSprite(d), d.barBg.visible = !0, d.barFill.visible = !0, d.barBg.position.setTo(0, d.height / 2), d.barFill.position.setTo(d.barBg.x - d.barBg.width / 2 + 1, d.barBg.y), d.barFill.width = d.barBg.width - 2, d.barFill.tint = 16777215, d.sprGun.visible = !1, this.isItBoss(d) && (d.gun = this.getEnemyGun(),
                d.sprGun.visible = !0, d.sprGun.frameName = "egun" + d.gun + ".png", d.bossProjectilesCnt = 0), this.isItRocket(d) && (d.lifeMax = 1E5, d.barBg.visible = !1, d.barFill.visible = !1, d.bringToTop(), this.showRoadWarning(d.lane)), d.life = d.lifeMax, d
        },
        loadCarHitSprite: function(a) {
            a.hit.visible = !1;
            a.car == CAR_AMBULANCE && (a.hit.visible = !0, a.hit.alpha = 0, a.hit.frameName = "traffic1_hit.png");
            if (a.car == CAR_GREEN || a.car == CAR_BLUE) a.hit.visible = !0, a.hit.alpha = 0, a.hit.frameName = "traffic23_hit.png";
            a.car == CAR_LIMO && (a.hit.visible = !0, a.hit.alpha =
                0, a.hit.frameName = "traffic4_hit.png");
            a.car == CAR_POLICE && (a.hit.visible = !0, a.hit.alpha = 0, a.hit.frameName = "traffic11_hit.png");
            a.car == CAR_ARMORED && (a.hit.visible = !0, a.hit.alpha = 0, a.hit.frameName = "traffic5_hit.png");
            a.car == CAR_TAXI && (a.hit.visible = !0, a.hit.alpha = 0, a.hit.frameName = "traffic6_hit.png");
            a.car == CAR_BOSS1 && (a.hit.visible = !0, a.hit.alpha = 0, a.hit.frameName = "traffic12_hit.png");
            a.car == CAR_BOSS2 && (a.hit.visible = !0, a.hit.alpha = 0, a.hit.frameName = "traffic13_hit.png");
            a.car == CAR_BOSS3 && (a.hit.visible = !0, a.hit.alpha = 0, a.hit.frameName = "traffic14_hit.png");
            if (a.car == TRUCK_BLUE || a.car == TRUCK_GREEN || a.car == TRUCK_ORANGE) a.hit.visible = !0, a.hit.alpha = 0, a.hit.frameName = "traffic789_hit.png";
            a.car == TRUCK_TANK && (a.hit.visible = !0, a.hit.alpha = 0, a.hit.frameName = "traffic10_hit.png")
        },
        getActiveCarsOfType: function(a) {
            void 0 === a && (a = null);
            for (var b = 0, c = sprCars.length - 1; 0 <= c; c--) !sprCars[c].visible || null != a && -1 == a.indexOf(sprCars[c].car) || b++;
            return b
        },
        updateCars: function() {
            for (var a = sprCars.length - 1; 0 <= a; a--) {
                var b =
                    sprCars[a];
                if (b.visible) {
                    this.isItBoss(b) && b.y >= .3 * game.height && (b.spdY = CAR_SPEED_BOSS);
                    wasOffscreen = 0 > b.y + b.height / 2;
                    b.y += b.spdY * gameTimeDelta() * nitroMul * (roadSpeed < ROAD_SPEED_GAME ? .4 : 1) * CARS_SPEED_MUL;
                    isOffscreen = 0 > b.y + b.height / 2;
                    if (wasOffscreen && !isOffscreen) this.onCarBecameOnScreen(b);
                    this.isItRocket(b) && 10 < b.y && this.hideRoadWarning(b.lane);
                    if (b.y > game.height + b.height) b.visible = !1;
                    else if (gameRunning && !(0 >= b.life || !this.isItBoss(b) && b.car != CAR_POLICE) && (b.sprGun.rotation = 2 * Phaser.Point.angle(b,
                            sprPlayerCar) - Math.PI, b.carFiringDelay -= game.time.elapsedMS, b.sprGun.frameDelay -= game.time.elapsedMS, 0 >= b.sprGun.frameDelay && (b.sprGun.frameName = "egun" + b.gun + ".png", b.sprGun.y = 30), 0 >= b.carFiringDelay))
                        if (b.carFiringDelay = this.getCarFiringDelay(b), b.sprGun.frameName = "egun" + b.gun + "b.png", b.sprGun.frameDelay = 100, b.sprGun.y = 28, b.bossProjectilesCnt++, soundManager.playSound("laser2"), 4 > b.gun) {
                            var c = this.getProjectileSpdX(b, sprPlayerCar, 400),
                                d = this.getProjectileSpdY(b, sprPlayerCar, 400);
                            this.spawnEnemyProjectile(this.getEnemyProjectileFrame(b),
                                c, d, 0, b.x + .2 * c, b.y + .2 * d, this.getEnemyProjectileDmg(b))
                        } else c = this.getProjectileSpdX(b, sprPlayerCar, 400), d = this.getProjectileSpdY(b, sprPlayerCar, 400), this.spawnEnemyProjectile(this.getEnemyProjectileFrame(b), c, d, 0, b.x - 13 + .2 * c, b.y + .2 * d, this.getEnemyProjectileDmg(b)), this.spawnEnemyProjectile(this.getEnemyProjectileFrame(b), c, d, 0, b.x + 13 + .2 * c, b.y + .2 * d, this.getEnemyProjectileDmg(b))
                }
            }
            sprPlayerLaserBeam.bringToTop();
            sprPlayerLaserSpark.bringToTop()
        },
        getEnemyGun: function(a) {
            a = PlayerLevel % 6;
            0 == a && (a = 6);
            return a
        },
        getEnemyProjectileDmg: function(a) {
            return [50, 100, 150, 25, 75, 120, 140][a.gun] * PlayerLevel
        },
        getEnemyProjectileFrame: function(a) {
            a = a.gun;
            4 <= a && (a -= 3);
            return "eshot" + a + ".png"
        },
        getCarFiringDelay: function(a) {
            return a.car == CAR_POLICE ? 1500 : 1 < PlayerLevel && 2 > a.bossProjectilesCnt % 6 ? 150 : 700
        },
        onCarBecameOnScreen: function(a) {
            this.isItRocket(a) && soundManager.playSound("rocket")
        },
        getCarInCollisionWithSprite: function(a) {
            for (var b = sprCars.length - 1; 0 <= b; b--) {
                var c = sprCars[b];
                if (c.visible && !(0 >= c.life || Math.abs(a.y -
                        c.y) > (a.height + c.height) / 2 || Math.abs(a.x - c.x) > (a.width + c.getCollisionWidth()) / 2)) return c
            }
            return null
        },
        damageCar: function(a, b) {
            0 >= a.life || (SceneGame.instance.isItBoss(a) && soundManager.playSound("bounce"), a.life -= b, a.barFill.width = (a.barBg.width - 2) / a.lifeMax * a.life, a.barFill.tint = Phaser.Color.interpolateColorWithRGB(16711680, 255, 255, 255, a.lifeMax, a.life), a.hit.alpha = 0, game.add.tween(a.hit).to({
                alpha: .3
            }, 50, Phaser.Easing.Quartic.Out, !0, 0, 0, !0), 0 >= a.life && SceneGame.instance.explodeCar(a))
        },
        explodeCar: function(a) {
            a.life =
                0;
            SceneGame.instance.spawnNewBonus(a);
            gameScore++;
            this.isItBoss(a) ? (SceneRoad.instance.changeRoadSprite(roadSpriteIdx + 1), PlayerLevel++, bossesDown++, bitmapTextParticles.CreateTextParticleLevel(game.width >> 1, 200, STR("LEVEL") + " " + PlayerLevel, 50, 16777215, Phaser.PIXI.blendModes.NORMAL)) : enemiesDown++;
            a.car != CAR_LIMO && a.car != CAR_LIMO && a.car != CAR_ARMORED && a.car != CAR_AMBULANCE || SceneGame.instance.shakeScreen(100, 5);
            a.car == TRUCK_TANK && (a.scale.set(2), imgGameBlink.alpha = 0, game.add.tween(imgGameBlink).to({
                    alpha: .5
                },
                120, Phaser.Easing.Quartic.Out, !0, 0, 0, !0), SceneGame.instance.damageSurroundingCars(a), SceneGame.instance.shakeScreen(120, 8));
            a.car == CAR_POLICE && PoliceDestroyed++;
            CarsDestroyed++;
            a.hit.visible = !1;
            a.barBg.visible = !1;
            a.barFill.visible = !1;
            a.sprGun.visible = !1;
            a.angle = getRandomUInt(360);
            a.animations.play("explode");
            particles.CreateExplosion(a.worldPosition.x, a.worldPosition.y);
            particles.CreateCarExplodingParts(a.worldPosition.x, a.worldPosition.y);
            playExplosion()
        },
        shakeScreen: function(a, b) {
            SceneGame._boundsCache =
                Phaser.Utils.extend(!1, {}, game.world.bounds);
            SceneGame._shakeWorldTime = a;
            SceneGame._shakeWorldMax = b;
            game.world.setBounds(SceneGame._boundsCache.x - SceneGame._shakeWorldMax, SceneGame._boundsCache.y - SceneGame._shakeWorldMax, SceneGame._boundsCache.width + SceneGame._shakeWorldMax, SceneGame._boundsCache.height + SceneGame._shakeWorldMax)
        },
        damageSurroundingCars: function(a) {
            for (var b = sprCars.length - 1; 0 <= b; b--) {
                var c = sprCars[b];
                if (c.visible && !(0 >= c.life) && c != a) {
                    var d = Math.abs(a.y - c.y),
                        e = Math.abs(a.x - c.x),
                        d = Math.sqrt(e *
                            e + d * d);
                    SceneGame.instance.damageCar(c, a.lifeMax * game.width / d)
                }
            }
        },
        onCarHasExploded: function(a, b) {
            a.visible = !1
        },
        resetCars: function() {
            for (var a = sprCars.length - 1; 0 <= a; a--) sprCars[a].visible = !1
        },
        createBonuses: function() {
            sprBonuses = [];
            for (var a = 0; a < MAX_BONUSES; a++) {
                var b = grpSceneGameCars.create(-1E3, -1E3, "pak2", "bonus_coin_0.png");
                b.animations.add("coin", Phaser.Animation.generateFrameNames("bonus_coin_", 0, 11, ".png"), 30, !0);
                b.anchor.set(.5);
                b.visible = !1;
                b.spdX = 0;
                b.spdY = 0;
                b.spdAng = 0;
                sprBonuses.push(b)
            }
        },
        getFreeBonus: function() {
            for (var a = sprBonuses.length - 1; 0 <= a; a--)
                if (!sprBonuses[a].visible) return sprBonuses[a];
            return null
        },
        spawnNewBonus: function(a) {
            perc = getRandomUInt(1E3);
            var b = SceneGame.instance.getFreeBonus();
            if (null != b) {
                b.animations.play("coin");
                if (perc <= BONUS_PERC_CASH || a.car == CAR_ARMORED) b.frameName = BONUS_CASH, b.animations.stop();
                a.car == CAR_AMBULANCE && (b.frameName = BONUS_HEALTH, b.animations.stop());
                a.car == CAR_TAXI && (b.animations.stop(), b.frameName = 500 >= perc ? BONUS_MAGNET : BONUS_NITRO);
                a.car ==
                    CAR_LIMO && (b.animations.stop(), b.frameName = BONUS_LASER);
                b.reset(a.x, a.y);
                b.spdY = -400;
                b.spdX = 150 * (500 >= getRandomUInt(1E3) ? -1 : 1);
                b.spdAng = 100
            }
        },
        updateBonuses: function() {
            for (var a = sprBonuses.length - 1; 0 <= a; a--) {
                var b = sprBonuses[a];
                b.visible && (b.bringToTop(), b.y += b.spdY * gameTimeDelta() * nitroMul, b.x += b.spdX * gameTimeDelta(), b.angle += b.spdAng * gameTimeDelta(), b.spdY += 20, 750 <= b.spdY && (b.spdY = 750), b.spdX *= .99, ScenePlayerCar.instance.isBonusActive(BONUS_MAGNET) && this.moveBonusTowardsPlayer(b), b.y > game.height +
                    b.height ? b.visible = !1 : b.x >= BORDER ? b.spdX *= -1 : b.x <= -BORDER && (b.spdX *= -1))
            }
        },
        moveBonusTowardsPlayer: function(a) {
            var b = a.worldPosition.x - sprPlayerCar.worldPosition.x,
                c = Math.abs(b),
                c = c / 100 * 240;
            0 < b ? a.x -= c * gameTimeDelta() : 0 > b && (a.x += c * gameTimeDelta());
            b = a.worldPosition.y - sprPlayerCar.worldPosition.y;
            c = Math.abs(b);
            0 > b && (a.y += c / 100 * 480 * gameTimeDelta())
        },
        getBonusInCollisionWithSprite: function(a) {
            for (var b = sprBonuses.length - 1; 0 <= b; b--) {
                var c = sprBonuses[b];
                if (c.visible && !(Math.abs(a.y - c.y) > (a.height + c.height) /
                        2 || Math.abs(a.x - c.x) > (a.width + c.width) / 2)) return c
            }
            return null
        },
        resetBonuses: function() {
            for (var a = sprBonuses.length - 1; 0 <= a; a--) sprBonuses[a].visible = !1
        },
        createProjectiles: function() {
            sprProjectiles = [];
            for (var a = 0; a < MAX_PROJECTILES; a++) {
                var b = grpSceneGameCars.create(-1E3, -1E3, "pak2", "shot2.png");
                b.anchor.set(.5);
                b.visible = !1;
                b.playerProjectile = !1;
                b.dmg = 20;
                sprProjectiles.push(b)
            }
            projectilesDelay = 100
        },
        getFreeProjectile: function() {
            if (0 >= sprPlayerCar.health) return null;
            for (var a = sprProjectiles.length - 1; 0 <=
                a; a--)
                if (!sprProjectiles[a].visible) return sprProjectiles[a];
            return null
        },
        updateProjectiles: function() {
            for (var a = sprProjectiles.length - 1; 0 <= a; a--) {
                var b = sprProjectiles[a];
                if (b.visible)
                    if (b.bringToTop(), b.y += b.spdY * gameTimeDelta(), b.x += b.spdX * gameTimeDelta(), b.x < -game.width / 2 - 2 * b.width) b.visible = !1;
                    else if (b.x >= game.width / 2 + 2 * b.width) b.visible = !1;
                else if (b.y < -b.height) b.visible = !1;
                else if (b.y > game.height + b.height) b.visible = !1;
                else if (b.playerProjectile) {
                    var c = this.getCarInCollisionWithSprite(b);
                    null !=
                        c && (this.damageCar(c, b.dmg * playerCarIdx), b.visible = !1)
                } else ScenePlayerCar.instance.isPlayerCarInCollisionWithSprite(b) && (soundManager.playSound("playerHit"), ScenePlayerCar.instance.damagePlayerCar(b.dmg), b.visible = !1)
            }
        },
        spawnEnemyProjectile: function(a, b, c, d, e, f, g) {
            sprProjectile = SceneGame.instance.getFreeProjectile();
            null != sprProjectile && (sprProjectile.frameName = a, sprProjectile.playerProjectile = !1, sprProjectile.spdX = b, sprProjectile.spdY = c, sprProjectile.angle = d, sprProjectile.reset(e, f), sprProjectile.dmg =
                g)
        },
        getProjectileSpdX: function(a, b, c) {
            var d = Phaser.Math.distance(a.x, a.y, b.x, b.y);
            return c / d * (b.x - a.x)
        },
        getProjectileSpdY: function(a, b, c) {
            var d = Phaser.Math.distance(a.x, a.y, b.x, b.y);
            return c / d * (b.y - a.y)
        },
        resetProjectiles: function() {
            for (var a = sprProjectiles.length - 1; 0 <= a; a--) sprProjectiles[a].visible = !1
        },
        RestartGame: function() {
            soundManager.playMusic("music_game");
            bossesDown = enemiesDown = gameScore = 0;
            roadSpeed = ROAD_SPEED_GAME;
            carWaveOffset = .98 * CAR_WAVE_HEIGHT;
            carWavesCounter = 15 * (PlayerLevel - 1) - 1;
            playerMeters =
                carWavesCounter * CAR_WAVE_HEIGHT / 2;
            0 > playerMeters && (playerMeters = 0);
            playerMetersStart = playerMeters;
            ScenePlayerCar.instance.resetPlayerCar();
            SceneGUI.instance.setPlayerHealthPerc(1);
            SceneGUI.instance.setPlayerMetersVal(playerMeters);
            particles.Reset();
            SceneRoad.instance.reset();
            SceneGame.instance.resetCars();
            SceneGame.instance.resetBonuses();
            SceneGame.instance.resetProjectiles();
            SceneGame.instance.hideRoadWarnings();
            gameRunning = !0;
            ScenesTransitions.showSceneAlpha(btnGamePause, 0, ScenesTransitions.TRANSITION_LENGTH);
            bitmapTextParticles.CreateTextParticleLevel(game.width >> 1, 200, STR("LEVEL") + " " + PlayerLevel, 50, 16777215, Phaser.PIXI.blendModes.NORMAL);
            "undefined" !== typeof gdsdk && "undefined" !== gdsdk.showBanner && gdsdk.showBanner();
            analyticsOnLevelStartEvent()
        },
        ResumeGame: function() {
            soundManager.playMusic("music_game");
            ScenePlayerCar.instance.isBonusActive(BONUS_LASER) && soundManager.sounds.powerwall.resume();
            gameRunning = !0;
            gamePaused = !1
        },
        GameOver: function() {
            gameRunning = !1;
            roadSpeed = ROAD_SPEED_MENU;
            SceneGameOver.instance.ShowAnimated();
            this.onGameOver(GAME_OVER_BY_GAME)
        },
        OnPressedFromGameToPause: function() {
            "undefined" !== typeof gdsdk && "undefined" !== gdsdk.showBanner && gdsdk.showBanner();
            SceneGame.instance._OnPressedFromGameToPause()
        },
        _OnPressedFromGameToPause: function() {
            ScenePlayerCar.instance.isBonusActive(BONUS_LASER) && soundManager.sounds.powerwall.pause();
            gameRunning = !1;
            gamePaused = !0;
            SceneOverlay.instance.ShowAnimated();
            ScenePause.instance.ShowAnimated()
        },
        onGameOver: function(a) {},
        onResolutionChange: function() {
            grpSceneGameCars.x =
                game.width / 2;
            btnGamePause.scale.set(1);
            btnGamePause.reset(50, game.height - 50)
        },
        onPause: function() {
            soundManager.pauseMusic();
            gameRunning && grpSceneGame.visible && !grpScenePause.visible && gameRunning && SceneGame.instance._OnPressedFromGameToPause()
        },
        onResume: function() {
            soundManager.resumeMusic()
        },
        UpdateParticles: function() {
            particles.Update()
        },
        ShowAnimated: function() {
            ScenesTransitions.transitionStarted();
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Quadratic.Out;
            ScenesTransitions.showSceneAlpha(grpSceneGame,
                0, ScenesTransitions.TRANSITION_LENGTH + 10, ScenesTransitions.transitionFinished);
            var a = game.add.tween(sprPlayerCar.position).to({
                x: 0,
                y: game.height - 100
            }, 1E3, ScenesTransitions.TRANSITION_EFFECT_IN, !1);
            a.onComplete.add(function() {
                ScenesTransitions.transitionFinished();
                gameRunning = !0;
                roadSpeed = ROAD_SPEED_GAME
            });
            a.start();
            a = game.add.tween(sprPlayerCar.scale).to({
                x: 1,
                y: 1
            }, 1E3, ScenesTransitions.TRANSITION_EFFECT_IN, !1);
            a.onUpdateCallback(function(a, c, d) {
                sprPlayerCar.angle = 0;
                grpSceneRoad.scale.set(sprPlayerCar.scale.x);
                tileSpriteRoad.x = game.width / 2 / grpSceneRoad.scale.x
            }, this);
            a.start()
        },
        HideAnimated: function() {
            SceneGame.instance.resetProjectiles();
            SceneGame.instance.resetBonuses();
            SceneGame.instance.resetCars();
            ScenesTransitions.transitionStarted();
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Quadratic.Out;
            ScenesTransitions.hideSceneAlpha(grpSceneGame, 0, ScenesTransitions.TRANSITION_LENGTH + 10)
        }
    };
    var GAME_OVER_BY_GAME = 0,
        GAME_OVER_BY_USER = 1;
    var SceneOverlay = function() {
        SceneOverlay.instance = this;
        this.create()
    };
    SceneOverlay.instance = null;
    SceneOverlay.prototype = {
        create: function() {
            grpSceneOverlay = game.add.group();
            grpSceneOverlay.name = "grpSceneOverlay";
            imgOverlay = grpSceneOverlay.create(game.width >> 1, game.height >> 1, "pak2", "blankw.png");
            imgOverlay.anchor.set(.5);
            imgOverlay.width = game.width;
            imgOverlay.height = game.height;
            imgOverlay.alpha = .8;
            imgOverlay.tint = 1907997;
            imgOverlay.inputEnabled = !0;
            grpSceneOverlay.visible = !1
        },
        onResolutionChange: function() {
            imgOverlay.reset(game.width >> 1, game.height >> 1);
            imgOverlay.width = game.width;
            imgOverlay.height =
                game.height
        },
        ShowAnimated: function() {
            SceneOverlay.instance.onResolutionChange();
            ScenesTransitions.showSceneAlpha(grpSceneOverlay, 0, ScenesTransitions.TRANSITION_LENGTH)
        },
        HideAnimated: function() {
            ScenesTransitions.hideSceneAlpha(grpSceneOverlay, 0, ScenesTransitions.TRANSITION_LENGTH)
        }
    };
    var SceneLanguages = function() {
        SceneLanguages.instance = this;
        this.create()
    };
    SceneLanguages.instance = null;
    SceneLanguages.prototype = {
        create: function() {
            grpSceneLanguages = game.add.group();
            imgLanguagesBackground = CreateBoardSpr(game.width >> 1, game.height >> 1, 585, 294, "pak2", "dialog_bg", .5, .5, 585, 294);
            imgLanguagesBackground.alpha = 1;
            grpSceneLanguages.add(imgLanguagesBackground);
            var a = -60;
            btnLangEN = grpSceneLanguages.create(-165, a, "pak2", "language_0.png");
            btnLangEN.anchor.set(.5);
            imgLanguagesBackground.addChild(btnLangEN);
            AddButtonEvents(btnLangEN, this.OnPressedLangEN, ButtonOnInputOver, ButtonOnInputOut);
            btnLangDE =
                grpSceneLanguages.create(-55, a, "pak2", "language_1.png");
            btnLangDE.anchor.set(.5);
            imgLanguagesBackground.addChild(btnLangDE);
            AddButtonEvents(btnLangDE, this.OnPressedLangDE, ButtonOnInputOver, ButtonOnInputOut);
            btnLangES = grpSceneLanguages.create(55, a, "pak2", "language_3.png");
            btnLangES.anchor.set(.5);
            imgLanguagesBackground.addChild(btnLangES);
            AddButtonEvents(btnLangES, this.OnPressedLangES, ButtonOnInputOver, ButtonOnInputOut);
            btnLangFR = grpSceneLanguages.create(165, a, "pak2", "language_2.png");
            btnLangFR.anchor.set(.5);
            imgLanguagesBackground.addChild(btnLangFR);
            AddButtonEvents(btnLangFR, this.OnPressedLangFR, ButtonOnInputOver, ButtonOnInputOut);
            a += 120;
            btnLangIT = grpSceneLanguages.create(-110, a, "pak2", "language_5.png");
            btnLangIT.anchor.set(.5);
            imgLanguagesBackground.addChild(btnLangIT);
            AddButtonEvents(btnLangIT, this.OnPressedLangIT, ButtonOnInputOver, ButtonOnInputOut);
            btnLangBR = grpSceneLanguages.create(0, a, "pak2", "language_4.png");
            btnLangBR.anchor.set(.5);
            imgLanguagesBackground.addChild(btnLangBR);
            AddButtonEvents(btnLangBR,
                this.OnPressedLangBR, ButtonOnInputOver, ButtonOnInputOut);
            btnLangRU = grpSceneLanguages.create(110, a, "pak2", "language_6.png");
            btnLangRU.anchor.set(.5);
            imgLanguagesBackground.addChild(btnLangRU);
            AddButtonEvents(btnLangRU, this.OnPressedLangRU, ButtonOnInputOver, ButtonOnInputOut);
            grpSceneLanguages.visible = !1
        },
        onResolutionChange: function() {
            imgLanguagesBackground.position.setTo(game.width >> 1, game.height >> 1)
        },
        OnPressedLangEN: function() {
            language = "en";
            sceneLanguages.OnLanguageSelected()
        },
        OnPressedLangDE: function() {
            language =
                "de";
            sceneLanguages.OnLanguageSelected()
        },
        OnPressedLangFR: function() {
            language = "fr";
            sceneLanguages.OnLanguageSelected()
        },
        OnPressedLangES: function() {
            language = "es";
            sceneLanguages.OnLanguageSelected()
        },
        OnPressedLangBR: function() {
            language = "pt";
            sceneLanguages.OnLanguageSelected()
        },
        OnPressedLangRU: function() {
            language = "ru";
            sceneLanguages.OnLanguageSelected()
        },
        OnPressedLangIT: function() {
            language = "it";
            sceneLanguages.OnLanguageSelected()
        },
        OnLanguageSelected: function() {
            try {
                localStorage.setItem("inl-rdfr-lang",
                    "" + language)
            } catch (a) {}
            Languages.instance.language = language;
            languageLoaded = !0;
            null == gameState ? game.state.start("GameState") : (gameState.updateTexts(), SceneLanguages.instance.HideAnimated(), SceneToReturnFromLanguage.ShowAnimated(), SceneToReturnFromLanguage == SceneMenu.instance && SceneLogo.instance.ShowAnimated())
        },
        ShowAnimated: function() {
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Quadratic.Out;
            ScenesTransitions.showSceneAlpha(grpSceneLanguages, 0, ScenesTransitions.TRANSITION_LENGTH);
            ScenesTransitions.TRANSITION_EFFECT_IN =
                Phaser.Easing.Linear.In
        },
        HideAnimated: function() {
            ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out;
            ScenesTransitions.hideSceneAlpha(grpSceneLanguages, ScenesTransitions.TRANSITION_LENGTH);
            ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out
        }
    };
    var INSTR_IMG_POS_X = 30,
        SceneInstructions = function() {
            SceneInstructions.instance = this;
            this.create()
        };
    SceneInstructions.instance = null;
    SceneInstructions.prototype = {
        create: function() {
            grpSceneInstructions = game.add.group();
            imgInstructionsBG = CreateBoardSpr(game.width >> 1, game.height >> 1, 470, 470, "pak2", "dialog_bg", .5, .5, 470, 470);
            grpSceneInstructions.addChild(imgInstructionsBG);
            txtInstructionsTitle = createShadowedBitmapText(0, -170, 35, "HOW TO PLAY", .5, .5);
            txtInstructionsTitle.textTop.tint = 53643;
            imgInstructionsBG.addChild(txtInstructionsTitle);
            imgInstructionsArrowLeft = grpSceneInstructions.create(-80, -80, "pak2", "arrow.png");
            imgInstructionsArrowLeft.anchor.set(.5);
            imgInstructionsBG.addChild(imgInstructionsArrowLeft);
            imgInstructionsArrowRight = grpSceneInstructions.create(80, -80, "pak2", "arrow.png");
            imgInstructionsArrowRight.scale.x = -1;
            imgInstructionsArrowRight.anchor.set(.5);
            imgInstructionsBG.addChild(imgInstructionsArrowRight);
            imgInstructionsCar = grpSceneInstructions.create(0, -80, "pak2", "car1.png");
            imgInstructionsCar.anchor.set(.5);
            imgInstructionsBG.addChild(imgInstructionsCar);
            imgInstructionsHand = grpSceneInstructions.create(0, 50, "pak2", "hand.png");
            imgInstructionsHand.anchor.set(.5);
            imgInstructionsBG.addChild(imgInstructionsHand);
            instrImgPosX = INSTR_IMG_POS_X;
            txtInstructionsText = createShadowedBitmapText(0, 150, 20, str("INSTR"), .5, .5, "center");
            imgInstructionsBG.addChild(txtInstructionsText);
            btnInstructionsQuit = grpSceneInstructions.create(50, game.height - 50, "pak2", "icon_back.png");
            btnInstructionsQuit.anchor.set(.5);
            AddButtonEvents(btnInstructionsQuit, this.OnPressedInstructionsClose, ButtonOnInputOver, ButtonOnInputOut);
            grpSceneInstructions.visible = !1;
            this.onResolutionChange();
            this.updateTexts()
        },
        onResolutionChange: function() {
            imgInstructionsBG.x = game.width >> 1;
            imgInstructionsBG.y = imgShopBG.y;
            btnInstructionsQuit.reset(50, game.height - 50)
        },
        update: function() {
            0 > instrImgPosX ? (imgInstructionsCar.x -= 30 * gameTimeDelta(), imgInstructionsCar.x <= -INSTR_IMG_POS_X && (imgInstructionsCar.x = -INSTR_IMG_POS_X, instrImgPosX = INSTR_IMG_POS_X)) : (imgInstructionsCar.x += 30 * gameTimeDelta(), imgInstructionsCar.x >= INSTR_IMG_POS_X && (imgInstructionsCar.x = INSTR_IMG_POS_X, instrImgPosX = -INSTR_IMG_POS_X));
            imgInstructionsHand.x = imgInstructionsCar.x
        },
        updateTexts: function() {
            setShadowBitmapText(txtInstructionsTitle, str("INSTRUCTIONS"), !0);
            setShadowBitmapText(txtInstructionsText, str("INSTR"), !0)
        },
        OnPressedInstructionsClose: function() {
            soundManager.playSound("menu-click1");
            ScenesTransitions.hideSceneAlpha(grpSceneInstructions);
            SceneToReturnFromInstructions.ShowAnimated();
            SceneToReturnFromInstructions == SceneMenu.instance && SceneLogo.instance.ShowAnimated()
        },
        ShowAnimated: function() {
            delayInstr = 1E3;
            SceneInstructions.instance.onResolutionChange();
            gameRunning = !1;
            ScenesTransitions.transitionStarted();
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Quadratic.Out;
            ScenesTransitions.showSceneAlpha(grpSceneInstructions, 200, 200, ScenesTransitions.transitionFinished);
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Linear.In
        },
        HideAnimated: function() {
            ScenesTransitions.transitionStarted();
            ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out;
            ScenesTransitions.hideSceneAlpha(grpSceneInstructions, .5 * ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.TRANSITION_LENGTH +
                10, ScenesTransitions.transitionFinished);
            ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out
        },
        GetRenderTypeName: function(a) {
            switch (a) {
                case Phaser.AUTO:
                    return "AUTO";
                case Phaser.CANVAS:
                    return "CANVAS";
                case Phaser.WEBGL:
                    return "WEBGL"
            }
            return "NaN"
        }
    };
    var ScenePause = function() {
        ScenePause.instance = this;
        this.create()
    };
    ScenePause.instance = null;
    ScenePause.prototype = {
        create: function() {
            grpScenePause = game.add.group();
            grpScenePause.name = "grpScenePause";
            txtPaused = createShadowedBitmapText(game.width >> 1, game.height >> 1, 50, "PAUSED", .5, .5);
            txtPaused.textTop.tint = 16776960;
            grpScenePause.addChild(txtPaused);
            btnPauseResume = game.add.sprite(game.width >> 1, (game.height >> 1) - 10, "pak2", "icon_play2.png");
            btnPauseResume.anchor.set(.5);
            grpScenePause.add(btnPauseResume);
            AddButtonEvents(btnPauseResume, ScenePause.instance.OnPressedResume, ButtonOnInputOver, ButtonOnInputOut);
            btnPauseRestart = game.add.sprite(game.width >> 1, (game.height >> 1) + 140, "pak2", "icon_restart.png");
            btnPauseRestart.anchor.set(.5);
            btnPauseRestart.width = btnPauseResume.width;
            btnPauseRestart.scale.y = btnPauseRestart.scale.x;
            grpScenePause.add(btnPauseRestart);
            AddButtonEvents(btnPauseRestart, ScenePause.instance.OnPressedRestart, ButtonOnInputOver, ButtonOnInputOut);
            btnPauseInstructions = game.add.sprite((game.width >> 1) + 120, (game.height >> 1) + 280, "pak2", "icon_help.png");
            btnPauseInstructions.anchor.set(.5);
            grpScenePause.add(btnPauseInstructions);
            AddButtonEvents(btnPauseInstructions, this.OnPressedPauseInstructions, ButtonOnInputOver, ButtonOnInputOut);
            btnPauseQuit = game.add.sprite((game.width >> 1) - 120, (game.height >> 1) + 280, "pak2", "icon_shop.png");
            btnPauseQuit.anchor.set(.5);
            btnPauseQuit.width = btnPauseInstructions.width;
            btnPauseQuit.height = btnPauseInstructions.height;
            grpScenePause.add(btnPauseQuit);
            AddButtonEvents(btnPauseQuit, this.OnPressedPauseToLevelSelection, ButtonOnInputOver, ButtonOnInputOut);
            grpScenePause.visible = !1;
            this.onResolutionChange();
            this.updateTexts()
        },
        onResolutionChange: function() {
            txtPaused.position.setTo(game.width >> 1, game.height >> 1);
            btnPauseResume.reset(game.width >> 1, game.height - 160);
            btnPauseRestart.reset(game.width >> 1, game.height - 60);
            btnPauseInstructions.reset(game.width - 50, game.height - 50);
            btnPauseQuit.reset(50, game.height - 50)
        },
        updateTexts: function() {
            setShadowBitmapText(txtPaused, STR("PAUSE"), !0)
        },
        OnPressedResume: function() {
            soundManager.playSound("menu-click1");
            ScenePause.instance.HideAnimated();
            SceneLogo.instance.HideAnimated();
            SceneOverlay.instance.HideAnimated();
            SceneGame.instance.ResumeGame()
        },
        OnPressedRestart: function() {
			gradle.event('btn_restart');
            soundManager.playSound("menu-click1");
            SceneGame.instance.onGameOver(GAME_OVER_BY_USER);
            ScenePause.instance.HideAnimated();
            SceneLogo.instance.HideAnimated();
            SceneOverlay.instance.HideAnimated();
            SceneGame.instance.RestartGame();
            gamePaused = !1
        },
        OnPressedPauseLang: function() {
            soundManager.playSound("menu-click1");
            SceneToReturnFromLanguage = ScenePause.instance;
            ScenePause.instance.HideAnimated();
            SceneLanguages.instance.ShowAnimated()
        },
        OnPressedPauseInstructions: function() {
			gradle.event('btn_pause');
            soundManager.playSound("menu-click1");
            SceneToReturnFromInstructions = ScenePause.instance;
            ScenePause.instance.HideAnimated();
            SceneInstructions.instance.ShowAnimated()
        },
        OnPressedPauseToLevelSelection: function() {
            soundManager.playSound("menu-click1");
            SceneGame.instance.onGameOver(GAME_OVER_BY_USER);
            SceneGUI.instance.setPlayerHealthPerc(100);
            SceneGame.instance.resetCars();
            SceneGame.instance.resetBonuses();
            SceneGame.instance.resetProjectiles();
            SceneGame.instance.hideRoadWarnings();
            particles.Reset();
            SceneOverlay.instance.HideAnimated();
            ScenePause.instance.HideAnimated();
            SceneGame.instance.HideAnimated();
            SceneShop.instance.ShowAnimated()
        },
        ShowAnimated: function(a) {
            ScenesTransitions.hideSceneAlpha(btnGamePause);
            void 0 === a && (a = 0);
            this.onResolutionChange();
            soundManager.playMusic("music_menu");
            soundManager.playSound("menu-click1");
            ScenesTransitions.transitionStarted();
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Back.Out;
            ScenesTransitions.showSceneAlpha(grpScenePause, a + 100,
                ScenesTransitions.TRANSITION_LENGTH);
            ScenesTransitions.showSceneScale(txtPaused, a + 200, 200, null, Phaser.Easing.Back.Out);
            ScenesTransitions.showSceneScale(btnPauseResume, a + 300, 200, null, Phaser.Easing.Back.Out);
            ScenesTransitions.showSceneScale(btnPauseRestart, a + 400, 200, null, Phaser.Easing.Back.Out);
            ScenesTransitions.showSceneScale(btnPauseQuit, a + 500, 200, null, Phaser.Easing.Back.Out);
            ScenesTransitions.showSceneScale(btnPauseInstructions, a + 600, 200, function() {
                    ScenesTransitions.transitionFinished()
                }, Phaser.Easing.Back.Out,
                1);
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Linear.In
        },
        HideAnimated: function() {
            ScenesTransitions.transitionStarted();
            ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out;
            ScenesTransitions.hideSceneAlpha(grpScenePause, 0, ScenesTransitions.TRANSITION_LENGTH, ScenesTransitions.transitionFinished);
            ScenesTransitions.showSceneAlpha(btnGamePause, 0, ScenesTransitions.TRANSITION_LENGTH);
            ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out
        }
    };
    var SceneGameOver = function() {
        SceneGameOver.instance = this;
        this.create()
    };
    SceneGameOver.instance = null;
    SceneGameOver.prototype = {
        create: function() {
            grpSceneGameOver = game.add.group();
            grpSceneGameOver.name = "grpSceneGameOver";
            imgGameOverBackground = CreateBoardSpr(game.width >> 1, game.height >> 1, 450, 480, "pak2", "dialog_bg", .5, .5, 450, 480);
            imgGameOverBackground.anchor.set(.5, .5);
            imgGameOverBackground.alpha = 1;
            grpSceneGameOver.add(imgGameOverBackground);
            imgGameOverBGTop = game.add.sprite(0, -115, "pak2", "result_bg.png");
            imgGameOverBGTop.anchor.set(.5);
            imgGameOverBackground.addChild(imgGameOverBGTop);
            imgGameOverNewBest = game.add.sprite(180, -200, "pak2", "new_best.png");
            imgGameOverNewBest.anchor.set(.5);
            imgGameOverBackground.addChild(imgGameOverNewBest);
            txtGameOverMetersFinalVal = createShadowedBitmapText(0, -115, 60, "12903", .5, .5);
            imgGameOverBackground.addChild(txtGameOverMetersFinalVal);
            txtGameOverMetersFinal = createShadowedBitmapText(0, -85, 20, "meters", .5, .5);
            imgGameOverBackground.addChild(txtGameOverMetersFinal);
            imgGameOverBGCenter = game.add.sprite(0, 65, "pak2", "result_text_bg.png");
            imgGameOverBGCenter.anchor.set(.5);
            imgGameOverBackground.addChild(imgGameOverBGCenter);
            txtGameOverDistanceBonus = createShadowedBitmapText(-160, -5, 26, "Distance bonus: ", 0, .5);
            imgGameOverBackground.addChild(txtGameOverDistanceBonus);
            txtGameOverDistanceBonusVal = createShadowedBitmapText(160, -5, 26, "110", 1, .5);
            imgGameOverBackground.addChild(txtGameOverDistanceBonusVal);
            txtGameOverEnemiesDown = createShadowedBitmapText(-160, 35, 26, "Enemies down: ", 0, .5);
            imgGameOverBackground.addChild(txtGameOverEnemiesDown);
            txtGameOverEnemiesDownVal = createShadowedBitmapText(160, 35, 26, "120", 1, .5);
            imgGameOverBackground.addChild(txtGameOverEnemiesDownVal);
            txtGameOverBossesDown = createShadowedBitmapText(-160, 75, 26, "Bosses down: ", 0, .5);
            imgGameOverBackground.addChild(txtGameOverBossesDown);
            txtGameOverBossesDownVal = createShadowedBitmapText(160, 75, 26, "130", 1, .5);
            imgGameOverBackground.addChild(txtGameOverBossesDownVal);
            imgGMOVRTextBreak = game.add.sprite(0, 110, "pak2", "text_break.png");
            imgGMOVRTextBreak.anchor.set(.5);
            imgGameOverBackground.addChild(imgGMOVRTextBreak);
            txtGameOverTotal = createShadowedBitmapText(-160, 145, 30, "TOTAL: ", 0, .5);
            txtGameOverTotal.textTop.tint = 53643;
            imgGameOverBackground.addChild(txtGameOverTotal);
            txtGameOverTotalVal = createShadowedBitmapText(160, 145, 30, "140", 1, .5);
            txtGameOverTotalVal.textTop.tint = 53643;
            imgGameOverBackground.addChild(txtGameOverTotalVal);
            imgGameOverTotalValCash = game.add.sprite(160, 145, "pak2", "bonus_cash.png");
            imgGameOverTotalValCash.anchor.set(.5, .5);
            imgGameOverTotalValCash.scale.set(.5);
            imgGameOverBackground.addChild(imgGameOverTotalValCash);
            imgGMOVRLogo = game.add.sprite(0, -230, "pak2", "logo.png");
            imgGMOVRLogo.anchor.set(.5);
            grpSceneGameOver.addChild(imgGMOVRLogo);
            btnGMOVRRestart = game.add.sprite((game.width >> 1) + 50, game.height - 50, "pak2", "icon_restart.png");
            btnGMOVRRestart.anchor.set(.5);
            btnGMOVRRestart.scale.set(.9);
            grpSceneGameOver.addChild(btnGMOVRRestart);
            AddButtonEvents(btnGMOVRRestart, SceneGameOver.instance.OnPressedRestart, ButtonOnInputOver, ButtonOnInputOut);
            btnGMOVRShop = game.add.sprite((game.width >> 1) - 50, game.height - 50, "pak2", "shop.png");
            btnGMOVRShop.anchor.set(.5);
            btnGMOVRShop.scale.set(.9);
            grpSceneGameOver.addChild(btnGMOVRShop);
            AddButtonEvents(btnGMOVRShop, this.OnPressedGMOVRToShop, ButtonOnInputOver, ButtonOnInputOut);
            imgGMOVRShopExcl = game.add.sprite(-88, -35, "pak2", "exclamation.png");
            imgGMOVRShopExcl.anchor.set(.5);
            imgGMOVRShopExcl.scale.set(1.2);
            btnGMOVRShop.addChild(imgGMOVRShopExcl);
            grpSceneGameOver.visible = !1;
            this.onResolutionChange()
        },
        onResolutionChange: function() {
            imgGMOVRLogo.scale.set(700 / game.height);
            .8 < imgGMOVRLogo.scale.x && imgGMOVRLogo.scale.set(.8);
            imgGMOVRLogo.x = game.width >> 1;
            imgGMOVRLogo.y = .2 * game.height;
            90 >
                imgGMOVRLogo.y && (imgGMOVRLogo.y = 90);
            imgGameOverBackground.reset(game.width >> 1, .55 * game.height);
            imgGameOverBackground.scale.set(650 / game.height);
            btnGMOVRShop.position.setTo((game.width >> 1) - 90, game.height - 100);
            btnGMOVRRestart.position.setTo((game.width >> 1) + 90, game.height - 100)
        },
        updateTexts: function() {},
        OnPressedRestart: function() {
			gradle.event('btn_over_restart');
            soundManager.playSound("menu-click1");
            
			SceneGameOver.instance.HideAnimated();
			SceneOverlay.instance.HideAnimated();
			SceneGame.instance.RestartGame();
        },
        OnPressedGMOVRLang: function() {
            soundManager.playSound("menu-click1");
            SceneToReturnFromLanguage = SceneGameOver.instance;
            SceneGameOver.instance.HideAnimated();
            SceneLanguages.instance.ShowAnimated()
        },
        OnPressedGMOVRInstructions: function() {
            soundManager.playSound("menu-click1");
            SceneToReturnFromInstructions = SceneGameOver.instance;
            SceneGameOver.instance.HideAnimated();
            SceneInstructions.instance.ShowAnimated()
        },
        OnPressedGMOVRToShop: function() {
            soundManager.playSound("menu-click1");
            SceneOverlay.instance.HideAnimated();
            SceneGameOver.instance.HideAnimated();
            SceneGame.instance.HideAnimated();
            SceneShop.instance.ShowAnimated();
            sprPlayerCar.rotation = 0;
            sprPlayerCar.frameName = "car" + playerCarIdx + ".png";
            sprPlayerCar.reset(0, game.height + 100)
        },
        ShowAnimated: function(a) {
            ScenesTransitions.hideSceneAlpha(btnGamePause);
            SceneGameOver.instance.onResolutionChange();
            void 0 === a && (a = 0);
            soundManager.playMusic("music_menu");
            soundManager.playSound("menu-click1");
            PlayerTotalMtrs += Math.floor(playerMeters -
                playerMetersStart);
            var b = Math.floor((playerMeters - playerMetersStart) / 10),
                c = enemiesDown + 100 * bossesDown + b;
            setShadowBitmapText(txtGameOverDistanceBonus, str("GMOVR_DIST") + " :", !0);
            setShadowBitmapText(txtGameOverEnemiesDown, str("GMOVR_ENEMIES") + " :", !0);
            setShadowBitmapText(txtGameOverBossesDown, str("GMOVR_BOSSES") + " :", !0);
            setShadowBitmapText(txtGameOverTotal, str("GMOVR_TOTAL") + " :", !0);
            setShadowBitmapText(txtGameOverMetersFinal, str("METERS"), !0);
            updateBitmapTextToWidth(txtGameOverDistanceBonus.textTop,
                26, 270);
            txtGameOverDistanceBonus.textShadow.fontSize = txtGameOverDistanceBonus.textTop.fontSize;
            updateBitmapTextToWidth(txtGameOverEnemiesDown.textTop, 26, 270);
            txtGameOverEnemiesDown.textShadow.fontSize = txtGameOverEnemiesDown.textTop.fontSize;
            updateBitmapTextToWidth(txtGameOverBossesDown.textTop, 26, 265);
            txtGameOverBossesDown.textShadow.fontSize = txtGameOverBossesDown.textTop.fontSize;
            updateBitmapTextToWidth(txtGameOverTotal.textTop, 26, 270);
            txtGameOverTotal.textShadow.fontSize = txtGameOverTotal.textTop.fontSize;
            updateBitmapTextToHeight(txtGameOverMetersFinal.textTop, 20, 30);
            txtGameOverMetersFinal.textShadow.fontSize = txtGameOverMetersFinal.textTop.fontSize;
            txtGameOverMetersFinal.visible = !1;
            txtGameOverMetersFinalVal.visible = !1;
            txtGameOverDistanceBonus.visible = !1;
            txtGameOverDistanceBonusVal.visible = !1;
            txtGameOverEnemiesDown.visible = !1;
            txtGameOverEnemiesDownVal.visible = !1;
            txtGameOverBossesDown.visible = !1;
            txtGameOverBossesDownVal.visible = !1;
            txtGameOverTotal.visible = !1;
            txtGameOverTotalVal.visible = !1;
            imgGameOverTotalValCash.visible = !1;
            btnGMOVRShop.visible = !1;
            btnGMOVRRestart.visible = !1;
            imgGameOverNewBest.visible = !1;
            ScenesTransitions.transitionStarted();
            ScenesTransitions.TRANSITION_EFFECT_IN = Phaser.Easing.Linear.In;
            ScenesTransitions.showSceneAlpha(grpSceneGameOver, a + 100, ScenesTransitions.TRANSITION_LENGTH);
            animVal1 = function() {
                SceneGameOver.instance.AnimateGameOverRow(txtGameOverDistanceBonus, txtGameOverDistanceBonusVal, b, animVal2)
            };
            animVal2 = function() {
                SceneGameOver.instance.AnimateGameOverRow(txtGameOverEnemiesDown, txtGameOverEnemiesDownVal,
                    enemiesDown, animVal3)
            };
            animVal3 = function() {
                SceneGameOver.instance.AnimateGameOverRow(txtGameOverBossesDown, txtGameOverBossesDownVal, bossesDown, animVal4)
            };
            animVal4 = function() {
                0 < bossesDown && setShadowBitmapText(txtGameOverBossesDownVal, "100 x " + bossesDown);
                SceneGameOver.instance.AnimateGameOverRow(txtGameOverTotal, txtGameOverTotalVal, c, animVal5)
            };
            animVal5 = function() {
                imgGameOverTotalValCash.x = txtGameOverTotalVal.x - txtGameOverTotalVal.textTop.width - imgGameOverTotalValCash.width;
                ScenesTransitions.showSceneAlpha(imgGameOverTotalValCash);
                imgGameOverTotalValCash.updateTransform();
                var a = Math.floor(playerMeters);
                a > PlayerRecord && (PlayerRecord = a, soundManager.playSound("result_gold-star"), ScenesTransitions.showSceneAlpha(imgGameOverNewBest), particles.CreateNewBestStars(imgGameOverBackground.x + imgGameOverNewBest.x - (imgGameOverNewBest.width >> 1), imgGameOverBackground.y + imgGameOverNewBest.y + (imgGameOverNewBest.height >> 1), 16777215, 5, PIXI.blendModes.ADD));
                coinParticles.AnimateCoins(c, imgGameOverTotalValCash, imgPlayerCash, txtGameOverTotalVal,
                    txtPlayerCash,
                    function() {
                        PlayerCash += c;
                        SceneGUI.instance.setPlayerCashVal(PlayerCash);
                        GameData.Save();
                        imgGMOVRShopExcl.visible = SceneShop.instance.EnoughCashToUpgrade();
                        ScenesTransitions.showSceneScale(btnGMOVRShop, 0, 200, null, Phaser.Easing.Back.Out, .9);
                        ScenesTransitions.showSceneScale(btnGMOVRRestart, 100, 200, function() {
                            SetPoingScaleTween(txtPlayerCash, 1.1, 70);
                            ScenesTransitions.transitionFinished()
                        }, Phaser.Easing.Back.Out, .9)
                    })
            };
            SceneGameOver.instance.AnimateGameOverRow(txtGameOverMetersFinal, txtGameOverMetersFinalVal,
                playerMeters, animVal1, 500)
        },
        AnimateGameOverRow: function(a, b, c, d, e) {
            void 0 === e && (e = 0);
            setShadowBitmapText(b, "0");
            ScenesTransitions.showSceneScale(a, e, 200, null, Phaser.Easing.Back.Out);
            ScenesTransitions.showSceneScale(b, e, 200, null, Phaser.Easing.Back.Out);
            soundManager.playSound("result_item_appear");
            SceneGameOver.instance.val = 0;
            a = game.add.tween(SceneGameOver.instance).to({
                val: c
            }, 300, null, !1, e);
            a.onUpdateCallback(function() {
                0 < SceneGameOver.instance.val && (soundManager.sounds.cnt.isPlaying || soundManager.playSound("cnt"));
                setShadowBitmapText(this.txtVal, "" + Math.floor(SceneGameOver.instance.val).toLocaleString());
                imgGameOverTotalValCash.x = -txtGameOverTotalVal.textTop.width - 7
            }, {
                txtVal: b
            });
            a.onComplete.add(function() {
                setShadowBitmapText(this.txtVal, "" + Math.floor(c).toLocaleString());
                this.callback()
            }, {
                txtVal: b,
                callback: d
            });
            a.start()
        },
        HideAnimated: function() {
            ScenesTransitions.transitionStarted();
            ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out;
            ScenesTransitions.hideSceneAlpha(grpSceneGameOver, 0, ScenesTransitions.TRANSITION_LENGTH,
                ScenesTransitions.transitionFinished);
            ScenesTransitions.TRANSITION_EFFECT_OUT = Phaser.Easing.Linear.Out
        }
    };
    var SceneGUI = function() {
        SceneGUI.instance = this;
        this.create()
    };
    SceneGUI.instance = null;
    SceneGUI.prototype = {
        create: function() {
            grpSceneGUI = game.add.group();
            imgGameHazardL = grpSceneGUI.create(0, game.height >> 1, "pak2", "beam.png");
            imgGameHazardL.tint = 16711680;
            imgGameHazardL.alpha = 0;
            imgGameHazardL.scale.x = 1.8;
            imgGameHazardL.anchor.set(.5);
            imgGameHazardL.height = game.height;
            imgGameHazardR = grpSceneGUI.create(game.width, game.height >> 1, "pak2", "beam.png");
            imgGameHazardR.tint = 16711680;
            imgGameHazardR.alpha = 0;
            imgGameHazardR.scale.x = -1.8;
            imgGameHazardR.anchor.set(.5);
            imgGameHazardR.height = game.height;
            imgGamePlayerHitL = grpSceneGUI.create(0, game.height >> 1, "pak2", "beam.png");
            imgGamePlayerHitL.tint = 16711680;
            imgGamePlayerHitL.alpha = 0;
            imgGamePlayerHitL.scale.x = 1.8;
            imgGamePlayerHitL.anchor.set(.5);
            imgGamePlayerHitL.height = game.height;
            imgGamePlayerHitR = grpSceneGUI.create(game.width, game.height >> 1, "pak2", "beam.png");
            imgGamePlayerHitR.tint = 16711680;
            imgGamePlayerHitR.alpha = 0;
            imgGamePlayerHitR.scale.x = -1.8;
            imgGamePlayerHitR.anchor.set(.5);
            imgGamePlayerHitR.height = game.height;
            imgGameHazardL.visible = !1;
            imgGameHazardR.visible = !1;
            game.add.tween(imgGameHazardL).to({
                alpha: .6
            }, 200, Phaser.Easing.Quartic.Out, !0, 100, -1, !0);
            game.add.tween(imgGameHazardR).to({
                alpha: .6
            }, 200, Phaser.Easing.Quartic.Out, !0, 100, -1, !0);
            imgTopLeftBG = grpSceneGUI.create(0, 0, "pak2", "top_left.png");
            imgTopLeftBG.anchor.setTo(0, 0);
            imgPlayerHealth = grpSceneGUI.create(57, 6, "pak2", "health.png");
            imgPlayerHealth.fullW = imgPlayerHealth.width;
            imgPlayerHealth.anchor.setTo(0, 0);
            imgTopLeftBG.addChild(imgPlayerHealth);
            cropPlayerHealth = new Phaser.Rectangle(0, 0, imgPlayerHealth.width,
                imgPlayerHealth.height);
            imgPlayerHealth.crop(cropPlayerHealth);
            imgBonusLeft = grpSceneGUI.create(80, 60, "pak2", "bonus_magnet.png");
            imgBonusLeft.anchor.setTo(.5, .5);
            imgTopLeftBG.addChild(imgBonusLeft);
            txtBonusDurationLeft = createShadowedBitmapText(90, 95, 23, "10", 1, .5);
            txtBonusDurationLeft.textTop.tint = 16776960;
            imgTopLeftBG.addChild(txtBonusDurationLeft);
            imgTopBG = grpSceneGUI.create(game.width / 2, 0, "pak2", "top.png");
            imgTopBG.anchor.setTo(.5, 0);
            imgTopRightBG = grpSceneGUI.create(game.width, 0, "pak2", "top_right.png");
            imgTopRightBG.anchor.setTo(1, 0);
            txtPlayerMetersVal = game.add.bitmapText(-115, 18, "gamefont_TA", "0 km", 18);
            txtPlayerMetersVal.anchor.setTo(0, .5);
            imgTopRightBG.addChild(txtPlayerMetersVal);
            imgBonusRight = grpSceneGUI.create(-80, 60, "pak2", "bonus_nitro.png");
            imgBonusRight.anchor.setTo(.5, .5);
            imgTopRightBG.addChild(imgBonusRight);
            txtBonusDurationRight = createShadowedBitmapText(-70, 95, 23, "10", 1, .5);
            txtBonusDurationRight.textTop.tint = 16776960;
            imgTopRightBG.addChild(txtBonusDurationRight);
            imgBonusCenter = grpSceneGUI.create(game.width >>
                1, 70, "pak2", "bonus_laser.png");
            imgBonusCenter.anchor.setTo(.5, .5);
            grpSceneGUI.addChild(imgBonusCenter);
            txtBonusDurationCenter = createShadowedBitmapText((game.width >> 1) + 10, 105, 23, "10", 1, .5);
            txtBonusDurationCenter.textTop.tint = 16776960;
            grpSceneGUI.addChild(txtBonusDurationCenter);
            txtPlayerCash = createShadowedBitmapText(game.width >> 1, 27, 35, "12 450", .5, .5);
            txtPlayerCash.textTop.tint = 53643;
            grpSceneGUI.addChild(txtPlayerCash);
            imgPlayerCash = grpSceneGUI.create(-182, 27, "pak2", "void.png");
            imgPlayerCash.anchor.setTo(.5,
                .5);
            imgTopRightBG.addChild(imgPlayerCash);
            btnFullscreenToggle = grpSceneGUI.create(22, 91, "pak2", "icon_fullscreen.png");
            btnFullscreenToggle.anchor.set(.5);
            btnFullscreenToggle.scale.set(.7);
            imgTopLeftBG.addChild(btnFullscreenToggle);
            AddButtonEvents(btnFullscreenToggle, function() {
                this.button.buttonPressed = !1
            }, ButtonOnInputOver, ButtonOnInputOut, this.ToggleFullscreen);
            SOUNDS_ENABLED && (btnSoundsToggle = grpSceneGUI.create(-22, 91, "pak2", soundManager.soundPlaying ? "icon_music_on.png" : "icon_music_off.png"), btnSoundsToggle.anchor.set(.5),
                btnSoundsToggle.scale.set(.7), imgTopRightBG.addChild(btnSoundsToggle), AddButtonEvents(btnSoundsToggle, this.ToggleSounds, ButtonOnInputOver, ButtonOnInputOut));
            txtBuildString = game.add.text(2, 2, "build " + GameData.BuildString + " [" + SceneGUI.instance.GetRenderTypeName(game.renderer.type) + "]  " + SceneGUI.instance.GetPhaserSettingsString(), {
                font: "11px Arial",
                fill: "#FFFFFF"
            });
            txtBuildString.anchor.x = 0;
            txtBuildString.visible = GameData.BuildDebug;
            grpSceneGUI.add(txtBuildString);
            this.setPlayerCashVal(PlayerCash);
            this.setPlayerBonusLeftDuration(0);
            this.setPlayerBonusRightDuration(0);
            this.setPlayerBonusCenterDuration(0);
            SceneGUI.instance.onResolutionChange()
        },
        setPlayerCashVal: function(a) {
            setShadowBitmapText(txtPlayerCash, "" + a)
        },
        setPlayerMetersVal: function(a) {
            if (1E3 < a) {
                var b = leadingZero(Math.floor(a % 1E3 / 10), 2);
                txtPlayerMetersVal.text = Math.floor(a / 1E3) + "." + b + " km"
            } else txtPlayerMetersVal.text = Math.floor(a) + " m"
        },
        setPlayerBonusLeftDuration: function(a) {
            imgBonusLeft.visible = 0 < a;
            txtBonusDurationLeft.visible = 0 < a;
            setShadowBitmapText(txtBonusDurationLeft, Math.ceil(a / 1E3) + "")
        },
        setPlayerBonusRightDuration: function(a) {
            imgBonusRight.visible = 0 < a;
            txtBonusDurationRight.visible = 0 < a;
            setShadowBitmapText(txtBonusDurationRight, Math.ceil(a / 1E3) + "")
        },
        setPlayerBonusCenterDuration: function(a) {
            imgBonusCenter.visible = 0 < a;
            txtBonusDurationCenter.visible = 0 < a;
            setShadowBitmapText(txtBonusDurationCenter, Math.ceil(a / 1E3) + "")
        },
        setPlayerHealthPerc: function(a) {
            0 > a && (a = 0);
            cropPlayerHealth.width = imgPlayerHealth.fullW * a;
            imgPlayerHealth.updateCrop();
            a = Math.floor(100 * a);
            imgGameHazardL.visible = 0 < a && 30 >= a;
            imgGameHazardR.visible = 0 < a && 30 >= a
        },
        update: function() {
            btnFullscreenToggle.frameName = screenfull.isFullscreen ? "icon_fullscreen2.png" : "icon_fullscreen.png"
        },
        onResolutionChange: function() {
            txtPlayerCash.x = game.width >> 1;
            imgGameHazardL.height = game.height;
            imgGameHazardR.height = game.height;
            imgGameHazardL.x = 0;
            imgGameHazardR.x = game.width;
            imgGameHazardL.y = game.height >> 1;
            imgGameHazardR.y = game.height >> 1;
            imgGamePlayerHitL.height = game.height;
            imgGamePlayerHitR.height =
                game.height;
            imgGamePlayerHitL.x = 0;
            imgGamePlayerHitR.x = game.width;
            imgGamePlayerHitL.y = game.height >> 1;
            imgGamePlayerHitR.y = game.height >> 1;
            imgTopBG.x = game.width / 2;
            imgTopLeftBG.x = 0;
            imgTopRightBG.x = game.width;
            btnFullscreenToggle.visible = false;screenfull.enabled;
            txtBuildString.position.setTo(game.width - 5, 2);
            imgTopBG.scale.set(1);
            imgTopRightBG.scale.set(1);
            imgTopLeftBG.scale.set(1);
            imgTopBG.width = imgTopRightBG.left - imgTopLeftBG.right
        },
        ButtonsOnLeft: function() {
            btnSoundsToggle.x = 26
        },
        ButtonsOnRight: function() {
            btnSoundsToggle.x =
                game.width - 26
        },
        GetRenderTypeName: function(a) {
            switch (a) {
                case Phaser.AUTO:
                    return "AUTO";
                case Phaser.CANVAS:
                    return "CANVAS";
                case Phaser.WEBGL:
                    return "WEBGL"
            }
            return "NaN"
        },
        GetPhaserSettingsString: function() {
            var a = game.width + "x" + game.height;
            game.debug.isDisabled || (a += ", enableDebug");
            game.debug.forceSingleUpdate && (a += ", forceSingleUpdate");
            return "[" + a + "]"
        },
        ToggleSounds: function() {
            soundManager.toggleSounds();
            soundManager.toggleMusic(soundManager.actualMusic);
            btnSoundsToggle.frameName = soundManager.soundPlaying ?
                "icon_music_on.png" : "icon_music_off.png";
            btnSoundsToggle.cachedTint = -1;
            btnSoundsToggle.cachedTint = -1
        },
        ToggleFullscreen: function(a) {
            a = a || this.button;
            a.buttonPressed = !1;
            screenfull.toggle()
        }
    };
    MIN_FPS = 25;
    var GameState = function(a) {},
        gameState = null,
        particles = null,
        bitmapTextParticles = null;
    GameState.prototype = {
        preload: function() {},
        create: function() {
            game.stage.backgroundColor = 2236962;
            game.renderer.renderSession.roundPixels = !0;
            game.time.advancedTiming = !0;
            Phaser.Device.desktop || (ScenesTransitions.TRANSITION_LENGTH *= .4, game.time.advancedTiming = !0, game.time.desiredFps = 35);
            gameState = this;
            soundManager = new SoundManager(game);
            soundManager.create();
            game.cache.addBitmapFontFromAtlas("gamefont_TA", "pak2", "gamefont_TA.png", "gamefont_TA_xml", "xml", 0, 0);
            game.cache.addBitmapFontFromAtlas("gamefont_RU", "pak2", "gamefont_RU.png", "gamefont_RU_xml", "xml", 0, 0);
            GameData.Load();
            scenes = [];
            scenes.push(new SceneRoad);
            scenes.push(new ScenePlayerCar);
            scenes.push(new SceneLogo);
            scenes.push(new SceneMenu);
            scenes.push(new SceneShop);
            scenes.push(new SceneGame);
            scenes.push(new SceneOverlay);
            scenes.push(new SceneGameOver);
            scenes.push(new SceneInstructions);
            scenes.push(new SceneLanguages);
            scenes.push(new ScenePause);
            scenes.push(new SceneGUI);
            bitmapTextParticles = new BitmapTextParticles(grpSceneGame);
            coinParticles =
                new CoinParticles(grpSceneGUI);
            SceneShop.instance.UpdateSelectedCar();
            grpPrevLangScene = grpSceneGame;
            SceneRoad.instance.ShowAnimated();
            ScenePlayerCar.instance.ShowAnimated();
            SceneLogo.instance.ShowAnimated();
            SceneMenu.instance.ShowAnimated(100);
            game.onPause.add(this.onGamePause, this);
            game.onResume.add(this.onGameResume, this);
            analyticsOnMainMenuLoadEvent();
            resizeCounter = 0
        },
        update: function() {
            bitmapTextParticles.Update();
            game.time.desiredFps = game.time.suggestedFps;
            game.time.desiredFps < MIN_FPS && (game.time.desiredFps =
                MIN_FPS);
            scenes.forEach(function(a) {
                "function" === typeof a.update && a.update()
            })
        },
        updateTexts: function() {
            scenes.forEach(function(a) {
                "function" === typeof a.updateTexts && a.updateTexts()
            })
        },
        onResolutionChange: function() {
            scenes.forEach(function(a) {
                if ("function" === typeof a.onResolutionChange) a.onResolutionChange()
            })
        },
        onGamePause: function() {
            LOG("onGamePause");
            scenes.forEach(function(a) {
                if ("function" === typeof a.onPause) a.onPause()
            });
            paused = !0
        },
        onGameResume: function() {
            LOG("onGameResume");
            paused = !1;
            scenes.forEach(function(a) {
                if ("function" ===
                    typeof a.onResume) a.onResume()
            })
        },
        render: function() {
            "function" === typeof renderFunction && renderFunction()
        },
        showFullscreeAd: function() {
            LOG("showFullscreeAd()")
        }
    };

    function showDiv(a, b) {
        null == b && (b = !1);
        if (!game.device.desktop || b) document.getElementById(a).style.display = "block"
    }

    function hideDiv(a, b) {
        null == b && (b = !1);
        if (!game.device.desktop || b) document.getElementById(a).style.display = "none"
    }

    function reloadPage() {
        window.location.reload(!0)
    };
    var resolutionX = game_resolution.xMax,
        resolutionY = game_resolution.y,
        languageLoaded = !1,
        isIOS = !1,
        userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) isIOS = !0;
    var aspect = window.innerWidth / window.innerHeight,
        androidVersionString = getAndroidVersion(),
        androidVersionMajor = 4;
    0 != androidVersionString && (androidVersionMajor = parseInt(getAndroidVersion(), 10));
    var GAME_FONT = "gameFont";
    4 > androidVersionMajor && (GAME_FONT = "arial");
    var chromeVersion = null,
        bdBrowser = null,
        selectedRenderer = null,
        defaultBrowser40 = null;
    try {
        chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10)
    } catch (e$$1794) {}
    selectedRenderer = Phaser.WEBGL;
    try {
        bdBrowser = -1 < window.navigator.appVersion.indexOf("bdbrowser"), defaultBrowser40 = -1 < window.navigator.appVersion.indexOf("Version/4.0")
    } catch (e$$1795) {}
    selectedRenderer = Phaser.AUTO;
    !Phaser.Device.desktop && (null != bdBrowser && 1 == bdBrowser || null != defaultBrowser40 && 1 == defaultBrowser40) && (selectedRenderer = Phaser.CANVAS);
    MaliDetect() && (selectedRenderer = Phaser.CANVAS);
    Phaser.Device.desktop || null == chromeVersion || (selectedRenderer = Phaser.CANVAS);
    var selectedRenderer = Phaser.CANVAS,
        config = {
            width: resolutionX,
            height: resolutionY,
            renderer: selectedRenderer,
            enableDebug: !0,
            antialias: !0,
            forceSetTimeOut: !1
        },
        game = new Phaser.Game(config);
    game.forceSingleUpdate = !0;
    game.state.add("SplashState", Splash);
    game.state.add("PreloadState", Preloader);
    game.state.add("GameState", GameState);
    game.state.start("SplashState");

    function isPortrait() {
        switch (window.orientation) {
            case 0:
            case 180:
                return !0
        }
        return !1
    }

    function MaliDetect() {
        var a = document.createElement("canvas");
        a.setAttribute("width", "1");
        a.setAttribute("height", "1");
        document.body.appendChild(a);
        var b = document.getElementsByTagName("canvas"),
            a = b[0].getContext("webgl", {
                stencil: !0
            });
        b[0].parentNode.removeChild(b[0]);
        if (!a) return !1;
        b = a.getExtension("WEBGL_debug_renderer_info");
        if (null != b) a = a.getParameter(b.UNMASKED_RENDERER_WEBGL);
        else return !1;
        return -1 != a.search("Mali-400") ? !0 : !1
    }
    RUNNING_ON_IOS || (document.addEventListener("touchstart", function(a) {
        a.preventDefault()
    }), document.addEventListener("touchmove", function(a) {
        a.preventDefault()
    }));
    document.documentElement.style.overflow = "hidden";
    document.body.scroll = "no";
    window.addEventListener("contextmenu", function(a) {
        a.preventDefault()
    });
    window.addEventListener("touchend", function() {
        if (null !== game) try {
            "running" !== game.sound.context.state && game.sound.context.resume()
        } catch (a) {}
    }, !1);


}();