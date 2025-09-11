@@ .. @@
           >
            <h2 className="finit-h1 mb-8" style={{ color: '#202226' }}>
+            <h2 className="finit-h1 mb-8 text-white">
               Waarom ons proces werkt
             </h2>
            <p className="finit-body max-w-4xl mx-auto mb-20" style={{ color: '#202226' }}>
+            <p className="finit-body text-white/80 max-w-4xl mx-auto mb-20">
               Bewezen resultaten door een gestructureerde aanpak, continue samenwerking en focus op meetbare impact.
             </p>
           </motion.div>
@@ .. @@
               whileHover={{ y: -12, scale: 1.03 }}
               className="bg-white/15 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/25 hover:shadow-3xl transition-all duration-500"
             >
              <h3 className="finit-h2 mb-6" style={{ color: '#202226' }}>{benefit.title}</h3>
              <p className="finit-body" style={{ color: '#202226' }}>{benefit.description}</p>
+              <h3 className="finit-h2 mb-6 text-white">{benefit.title}</h3>
+              <p className="finit-body text-white/80">{benefit.description}</p>
             </motion.div>
           ))}
         </div>