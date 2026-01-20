export default function ApexCard({ title, children }) {
    return (
        <div className="bg-(--card)  shadow-(--bs) p-4 mb-4">
            {title && (
                <h3 className="text-(--text) text-2xl font-semibold mb-3">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}
