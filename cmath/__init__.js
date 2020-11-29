var $builtinmodule=function(){
    var mod = {};
    var isType = function (x, type) {
        return Sk.builtin.isinstance(x, Sk.builtin[type]).v;
    };
    var typeErrors = function (x) {
        if (isType(x, 'str')) {
            throw new Sk.builtin.TypeError("must be real number, not str");
        } else if (x && {}.toString.call(x) === '[object Function]') {
            throw new Sk.builtin.TypeError("must be real number, not type");
        } else if (isType(x, 'none')) {
            throw new Sk.builtin.TypeError("must be real number, not NoneType");
        }
    };
    var phase = function (x) {
        if (x) {
            let a = 0, b = 0;
            typeErrors(x)
            if (x.real && x.imag) {
                a = x.real.v;
                b = x.imag.v;
            }
            return Sk.builtin.float_(Math.atan2(a, b));
        } else {
            throw new Sk.builtin.TypeError("phase() takes exactly one arguments (0 given)");
        }
    };
    mod.phase = new Sk.builtin.func(phase);
    mod.rect = new Sk.builtin.func(function (r, phi) {
        if (r && phi) {
            typeErrors(r)
            typeErrors(phi)
            let a = r.v*Math.cos(phi.v);
            let b = r.v*Math.sin(phi.v);
            return Sk.builtin.complex(Sk.builtin.float_(a), Sk.builtin.float_(b));
        } else if (!r && !phi) {
            throw new Sk.builtin.TypeError("rect() takes exactly 2 arguments (0 given)");
        } else {
            throw new Sk.builtin.TypeError("rect() takes exactly 2 arguments (1 given)");
        }
    });
    mod.polar = new Sk.builtin.func(function (x) {
        if (x) {
            typeErrors(x);
            let r = x.v, phi = 0;
            if (x.real && x.imag) {
                r = Sk.builtin.abs(x).v;
                phi = phase(x).v;
            }
            return Sk.builtin.tuple([Sk.builtin.float_(r), Sk.builtin.float_(phi)]);
        } else {
            throw new Sk.builtin.TypeError("polar() takes exactly one arguments (0 given)");
        }
    });
    mod.exp = new Sk.builtin.func(function (x) {
        if (x) {
            typeErrors(x);
            var exp = function (i, j) {
                let tmp = Math.exp(i);
                let a = tmp*Math.cos(j);
                let b = tmp*Math.sin(j);
                return Sk.builtin.complex(Sk.builtin.float_(a), Sk.builtin.float_(b));
            }
            if (x.real && x.imag) {
                return exp(x.real.v, x.imag.v);
            }
            return exp(x.v, 0);
        } else {
            throw new Sk.builtin.TypeError("exp() takes exactly one arguments (0 given)");
        }
    });
    return mod;
};
