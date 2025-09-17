@@ .. @@
           >
-            <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-white tracking-tight">
+            <h2 className="finit-h1 mb-8 text-white">
               Waarom ons proces werkt
             </h2>
-            <p className="text-white/80 text-xl max-w-4xl mx-auto mb-20 font-light leading-relaxed tracking-wide">
+            <p className="finit-body text-white/80 max-w-4xl mx-auto mb-20">
               Bewezen resultaten door een gestructureerde aanpak, continue samenwerking en focus op meetbare impact.
             </p>
           </motion.div>
@@ .. @@
               whileHover={{ y: -12, scale: 1.03 }}
               className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/25 hover:shadow-3xl transition-all duration-500"
             >
-              <h3 className="text-xl font-light mb-6 text-white tracking-wide">{benefit.title}</h3>
-              <p className="text-white/80 font-light leading-relaxed tracking-wide text-base">{benefit.description}</p>
+              <h3 className="finit-h2 mb-6 text-white">{benefit.title}</h3>
+              <p className="finit-body text-white/80">{benefit.description}</p>
             </motion.div>
           ))}
         </div>