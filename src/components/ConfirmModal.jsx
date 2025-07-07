import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({ open, onClose, onConfirm, title = "Confirm", children }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <h3 className="text-xl font-bold text-purple-700 mb-4">{title}</h3>
            <div className="mb-6 text-gray-800">{children}</div>
            <div className="flex gap-3 justify-center">
              <button
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-semibold shadow transition"
                onClick={onConfirm}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-purple-700 rounded-lg hover:bg-gray-300 font-semibold transition"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
